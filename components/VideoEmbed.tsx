interface Props {
  videoId: string;
}

export default function VideoEmbed({ videoId }: Props) {
  if (!videoId) return null;

  return (
    <div className="w-full max-w-2xl aspect-video mt-4">
      <iframe
        className="w-full h-full rounded-lg"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
