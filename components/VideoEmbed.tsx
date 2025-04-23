interface Props {
  videoId: string;
}

export default function VideoEmbed({ videoId }: Props) {
  if (!videoId) return null;

  return (
    <div className="w-full aspect-video xl:h-[395px]">
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
