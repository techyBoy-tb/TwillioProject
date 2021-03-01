import { JsonObject } from '@angular-devkit/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  connect,
  createLocalVideoTrack, Room
} from 'twilio-video';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  tokenUrl = 'https://lemon-dove-8474.twil.io/video-token?identity='
  currentRoom: Room;

  constructor(private http: HttpClient) {
  }

  public getAccessToken(personName: string, roomName: string) {
    const url = this.tokenUrl + `${personName}&roomName=${roomName}`;
    return this.http.get<any>(url)
      .pipe(
        map((res: JsonObject) => {
          return res;
        }),
      );
  }

  async leaveRoom() {
    this.currentRoom.disconnect();
  }
  async joinOrCreateRoom(token: string) {
    const localVideoTrack = await createLocalVideoTrack({ width: 100 });

    const room = connect(token, { localVideoTrack, dominantSpeaker: true, }).then(room => {
      this.currentRoom = room;

      room.participants.forEach(this.participantConnected);
      room.on("participantConnected", this.participantConnected);

      room.on("participantDisconnected", this.participantDisconnected);
      room.once("disconnected", (error) =>
        room.participants.forEach(this.participantDisconnected)
      );
    });
  }

  participantConnected = (participant) => {
    console.log(`Participant ${participant.identity} connected.`);

    const parentDiv = document.createElement('div');
    parentDiv.id = `parent-${participant.sid}`;
    parentDiv.classList.add("card");
    const childDiv = `<h3>${participant.identity}</h3><div class="thinggg" id=${participant.sid}></div>`
    parentDiv.innerHTML = childDiv;

    document.getElementById('card-container').appendChild(parentDiv);
    participant.on('trackSubscribed', track => this.trackSubscribed(participant.sid, track));
    participant.on('trackUnsubscribed', this.trackUnsubscribed);

    participant.tracks.forEach(publication => {
      if (publication.isSubscribed) {
        this.trackSubscribed(participant.sid, publication.track);
      }
    });
  }
  participantDisconnected = (participant) => {
    console.log(`Participant ${participant.identity} disconnected.`);
    document.getElementById(`parent-${participant.sid}`).remove();
  }

  trackSubscribed(identity, track) {
    document.getElementById(identity).appendChild(track.attach());
  }
  trackUnsubscribed(track) {
    track.detach().forEach(element => element.remove());
  }
}
