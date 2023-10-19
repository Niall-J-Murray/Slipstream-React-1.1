package me.niallmurray.slipstream.webrest;

import jakarta.validation.Valid;
import me.niallmurray.slipstream.domain.Team;
import me.niallmurray.slipstream.domain.User;
import me.niallmurray.slipstream.service.TeamService;
import me.niallmurray.slipstream.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@CrossOrigin(exposedHeaders = "Access-Control-Allow-Origin")
@CrossOrigin
@RequestMapping("api/team")
public class TeamController {
  @Autowired
  private TeamService teamService;
  @Autowired
  private UserService userService;

  @GetMapping("/all-teams")
  public ResponseEntity<List<Team>> getAllTeams() {
    List<Team> allTeams;
    try {
      allTeams = teamService.findAllTeams();
    } catch (Exception e) {
      return ResponseEntity.status(500).build();
    }
//    System.out.println("teams" + allTeams);
    return ResponseEntity.ok(allTeams);
  }

  @GetMapping("/{teamId}")
  public ResponseEntity<Team> getTeamById(@PathVariable Long teamId, @AuthenticationPrincipal User userAuth) {
    Team team = teamService.findById(teamId);

//    System.out.println("current team" + team);
    return new ResponseEntity<>(team, HttpStatus.OK);
  }

  @PostMapping("team/{userId}")
  public ResponseEntity<Team> getTeamById(@Valid @RequestBody String teamName, @PathVariable Long userId) {
    User user = userService.findById(userId);
    String teamNameFromJson = teamName.substring(13, (teamName.length() - 2));
    Team team = teamService.createTeam(user, teamNameFromJson);
//    team = teamService.findById(team.getId());
    team = teamService.findByIdTeamName(teamNameFromJson);
    System.out.println("new team: " + team);
    return ResponseEntity.ok(team);
  }
}
