import Image from "next/image"

type Props = {
  trackId: string
  name: string
  artists: string[]
  imageUrl: string
  frequency: number
}

const TrackItem = ({ name, artists, imageUrl, frequency }: Props) => {
  return (
    <div
      className="
        flex items-center gap-2
        rounded-lg p-2 pr-3
        border
        bg-slate-900 border-slate-700
        max-w-lg
      "
    >
      <Image
        src={imageUrl}
        width={48}
        height={48}
        alt="Track album cover image"
        className="bg-slate-600 rounded h-12 w-12"
      />
      <div className="flex w-full flex-col gap-1 pr-2">
        <p>{name}</p>
        <p className="text-xs text-slate-200">{artists.join(', ')}</p>
      </div>
      <p>
        {frequency}
      </p>
    </div>
  )
}

export default TrackItem