import { JsonObject } from '@angular-devkit/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  connect,

  createLocalVideoTrack
} from 'twilio-video';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  $roomsUpdated: Observable<boolean>;
  tokenUrl = 'https://lemon-dove-8474.twil.io/video-token?identity='

  private roomBroadcast = new ReplaySubject<boolean>();

  constructor(private http: HttpClient) {
    this.$roomsUpdated = this.roomBroadcast.asObservable();
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

  async joinOrCreateRoom(token: string) {
    const localVideoTrack = await createLocalVideoTrack({ width: 640 });
    const room = connect(token, { localVideoTrack, dominantSpeaker: true, }).then(room => {
      console.log('successfully connected to room: ', room);

      room.on('participantConnected', participant => {
        console.log('A new particiapnt has joined: ', participant);
        participant.tracks.forEach(publication => {
          if (publication.isSubscribed) {
            const track = participant.track;
            document.getElementById('remote-media-container').appendChild(track.attach());
          }
        });
        participant.on('trackSubscribed', track => {
          document.getElementById('remote-media-container').appendChild(track.attach());
        });
      });

      room.participants.forEach(participant => {
        participant.tracks.forEach(publication => {
          if (publication.track) {
            document.getElementById('remote-media-container').appendChild(publication.track.attach());
          }
        });
        participant.on('trackSubscribed', track => {
          document.getElementById('remote-media-container').appendChild(track.attach());
        });
      });
      console.log('this is the parts of the room', room.localParticipant.identity);


      // room.once('participantDisconnected', participant => {
      //   console.log(`Participant "${participant.identity}" has disconnected from the Room`);
      //   participant.track.stop();
      //   participant.unpublish();
      //   document.getElementById('remote-media-container').removeChild(participant.track.detach());
      // });
      room.once('participantDisconnected', participant => {
        console.log(`Participant "${participant.identity}" has disconnected from the Room`);
        document.getElementById('remote-media-container').removeChild(participant.track.detach());

      });
      room.on('participantDisconnected', participant => {
        console.log(`Participant disconnected: ${participant.identity}`);
      });
      room.on('disconnected', room => {
        // Detach the local media elements
        room.localParticipant.tracks.forEach(publication => {
          const attachedElements = publication.track.detach();
          attachedElements.forEach(element => element.remove());
        });
      });

    });
  }
}
