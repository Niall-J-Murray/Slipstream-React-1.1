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

  @GetMapping("/pick-made")
  public SseEmitter pickMade() throws IOException {
    SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
    String key = "SSE Test " + Math.random();
    sseEmitters.put(key, sseEmitter);
    sseEmitter.send(SseEmitter.event().name("pick_made").data("test"));
    sseEmitter.onCompletion(() -> sseEmitters.remove(key));
    sseEmitter.onTimeout(() -> sseEmitters.remove(key));
    System.out.println("sseEmitter sent");
    return sseEmitter;
  }
}
