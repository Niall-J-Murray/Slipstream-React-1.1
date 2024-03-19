package me.niallmurray.slipstream.webrest;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/sse")
public class SseController {

  private Map<String, SseEmitter> sseEmitters = new ConcurrentHashMap<>();

  @GetMapping("/eventEmitter")
  public SseEmitter eventEmitter() throws IOException {
    SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
    UUID guid = UUID.randomUUID();
    sseEmitters.put(guid.toString(), sseEmitter);
    sseEmitter.send(SseEmitter.event().name("GUI_ID").data(guid));
    sseEmitter.onCompletion(() -> sseEmitters.remove(guid.toString()));
    sseEmitter.onTimeout(() -> sseEmitters.remove(guid.toString()));
    return sseEmitter;
  }

  @GetMapping("/test-pick-made")
  public SseEmitter testPickMade(Long userId, String surname) throws IOException {
    SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
    if (userId != null) {
      sseEmitter.send(surname);
//      String message = SseEmitter.event().name("driverName").data(surname).toString();
//      sseEmitter.send(SseEmitter.event().name("driverName").data(surname));
//      System.out.println(message);
      System.out.println("driver name: " + surname);
    }
    sseEmitter.complete();
    return sseEmitter;
  }

  @GetMapping("/pick-made")
  public SseEmitter pickMade(Long userId) throws IOException {
//  public SseEmitter pickMade() throws IOException {
//    if (userId != null) {
      SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
//    String key = "SSE Test " + Math.random();
      String key = String.valueOf(userId);
      sseEmitters.put(key, sseEmitter);
//    sseEmitter.send(SseEmitter.event().name("pick_made").data("test"));
      sseEmitter.send(SseEmitter.event().name("pick_made").data(key));
      sseEmitter.onCompletion(() -> sseEmitters.remove(key));
      sseEmitter.onTimeout(() -> sseEmitters.remove(key));
      System.out.println("sseEmitter user ID: " + key);
      return sseEmitter;
//    }
//    return null;
  }
}
