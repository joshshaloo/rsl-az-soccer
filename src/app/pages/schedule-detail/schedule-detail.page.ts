import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavParams, ModalController } from "@ionic/angular";

import _ from "lodash";

import { TournamentService } from "../../services/tournament/tournament.service";
import { t } from "tar";

@Component({
  selector: "app-schedule-detail",
  templateUrl: "./schedule-detail.page.html",
  styleUrls: ["./schedule-detail.page.scss"]
})
export class ScheduleDetailPage implements OnInit {
  teamId: string;
  allGames: any[];
  // dateFilter: string;
  games: any[];
  // isFollowing = false;
  team: any;
  teamStanding: any;
  private tourneyData: any;
  // useDateFilter = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tournamentService: TournamentService,
    private navParams: NavParams,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    // this.teamId = this.activatedRoute.snapshot.paramMap.get("id");
    this.teamId = this.navParams.get("teamId");

    console.log("loading team data for " + this.teamId);
    this.tourneyData = this.tournamentService.getCurrentTourney();
    console.log(this.tourneyData);

    let team = _.chain(this.tourneyData.teams)
      .filter(t => t.id === this.teamId)
      .map(t => {
        return {
          teamId: t.id,
          flight: t.flight,
          teamName: t.name
        };
      })
      .value();
    this.team = team[0];
    console.log(this.team);

    this.games = _.chain(this.tourneyData.games)
      .filter(g => g.homeTeamId === this.teamId || g.awayTeamId === this.teamId)
      .map(g => {
        let isHome = g.homeTeamId === this.teamId;
        let opponentName = isHome ? g.awayTeam : g.homeTeam;
        let scoreDisplay = this.getScoreDisplay(
          isHome,
          g.homeScore,
          g.awayScore
        );
        return {
          gameId: g.id,
          opponent: opponentName,
          time: Date.parse(g.time),
          location: g.location,
          locationUrl: g.locationUrl,
          scoreDisplay: scoreDisplay,
          homeAway: isHome ? "home" : "away",
          vsAt: isHome ? "" : "at"
        };
      })
      .value();

    this.allGames = this.games;
    this.teamStanding = _.find(this.tourneyData.standings, {
      teamId: this.teamId
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }

  getScoreDisplay(isHome, homeScore, awayScore) {
    if (homeScore != null && awayScore != null) {
      var teamScore = isHome ? homeScore : awayScore;
      var opponentScore = isHome ? awayScore : homeScore;
      var winIndicator = teamScore > opponentScore ? "WIN " : "LOSS ";
      if (teamScore == opponentScore) {
        winIndicator = "DRAW "
      }
      return winIndicator + teamScore + "-" + opponentScore;
    } else {
      return "";
    }
  }
}
