export default class Song {
  constructor({id,picUrl,duration,singer,name,mvId}) {
    this.id = id;
    this.picUrl = picUrl;
    this.duration = duration/1000;
    this.singer = singer;
    this.url = getMusicUrl(id);
    this.name= name;
    this.mvId = mvId;
  }
}
export const createSong = (musicData) => {
  return new Song(musicData);
}

const getMusicUrl = (id) => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}
