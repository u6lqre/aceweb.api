type PlaybackData = {
  infohash: string;
  playback_session_id: string;
  playback_url: string;
  stat_url: string;
  command_url: string;
  is_live: 0 | 1;
  is_encrypted: 0 | 1;
  client_session_id: number;
};

type PlaybackResponse = {
  response: PlaybackData;
  error: null | unknown;
};

class StreamService {
  public async getPlaybackUrl(infohash: string): Promise<string> {
    const data = await this.fetchPlaybackData(infohash);
    return data.response.playback_url;
  }

  private async fetchPlaybackData(infohash: string): Promise<PlaybackResponse> {
    const url = new URL("/ace/manifest.m3u8", process.env.ENGINE_URL);
    url.searchParams.set("format", "json");
    url.searchParams.set("content_id", infohash);

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch stream data");

    const data = await response.json();
    return data as PlaybackResponse;
  }
}

export default new StreamService();
