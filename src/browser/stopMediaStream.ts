/**
 * Stop every track of a media stream (camera, microphone, screen) so the
 * device is released and its indicator turns off. Missing stream → no-op.
 *
 * @example
 * useEffect(() => () => stopMediaStream(streamRef.current), []);
 */
export function stopMediaStream(stream?: MediaStream | null): void {
  for (const track of stream?.getTracks() ?? []) {
    track.stop();
  }
}
