package me.niallmurray.slipstream.webrest;

import me.niallmurray.slipstream.domain.Driver;
import me.niallmurray.slipstream.domain.League;
import me.niallmurray.slipstream.domain.User;
import me.niallmurray.slipstream.dto.DriverStanding;
import me.niallmurray.slipstream.dto.DriverStandingResponse;
import me.niallmurray.slipstream.dto.StandingsList;
import me.niallmurray.slipstream.service.AdminService;
import me.niallmurray.slipstream.service.DriverService;
import me.niallmurray.slipstream.service.LeagueService;
import me.niallmurray.slipstream.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Objects;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
public class AdminController {
  @Autowired
  private TeamService teamService;
  @Autowired
  private LeagueService leagueService;
  @Autowired
  private DriverService driverService;
  @Autowired
  private AdminService adminService;
  @Value("${ergast.urls.base}${ergast.urls.currentDriverStandings}.json")
  private String f1DataApi;

  @GetMapping("/allUsers")
  public ResponseEntity<List<User>> getAllUsers() {
    List<User> allUserAccounts = adminService.getAllUserAccounts();
//    modelMap.addAttribute("users", allUserAccounts);
//    modelMap.addAttribute("leagues", leagueService.findAll());
////    modelMap.addAttribute("activeUsers", activeUserStore.getUsers());
//    modelMap.addAttribute("allDrivers", driverService.sortDriversStanding());
//    modelMap.addAttribute("isLoggedIn", true);
//    modelMap.addAttribute("isAdmin", true);
    return ResponseEntity.ok(allUserAccounts);
  }

  @GetMapping("/allLeagues")
  public ResponseEntity<List<League>> getAllLeagues() {
    return ResponseEntity.ok(leagueService.findAll());
  }

  @ResponseBody
  @GetMapping("/driverStandingsJSON")
  public ResponseEntity<DriverStandingResponse> getDriverStandingsResponse() {
    return new RestTemplate().getForEntity(f1DataApi, DriverStandingResponse.class);
  }

  public List<Driver> getDriversFromResponse() {
    List<StandingsList> standingsLists = Objects.requireNonNull(getDriverStandingsResponse().getBody())
            .mRData.standingsTable
            .standingsLists;
    List<DriverStanding> currentStandings = standingsLists.listIterator().next().driverStandings;

    return driverService.mapDTOToDrivers(currentStandings);
  }

  @PostMapping("/addDrivers")
  public String getAddDrivers() {
    driverService.addDrivers(getDriversFromResponse());
    System.out.println("Drivers Added!");
    return "Drivers Added!";
  }

  // To automatically add drivers when first user attempts login,
  // if admin role has not already added drivers.
  // Admin can manually add drivers using PostMapping above.
  public void addDrivers() {
    List<Driver> latestStandings = getDriversFromResponse();
    driverService.addDrivers(latestStandings);
  }

  @PostMapping("/updateStandings")
  public String getUpdateStandings() {
    driverService.updateDrivers(getDriversFromResponse());

    for (League league : leagueService.findAll()) {
      teamService.updateLeagueTeamsRankings(league);
    }
    System.out.println("Leagues updated!");
    return "Leagues updated!";
  }
}
