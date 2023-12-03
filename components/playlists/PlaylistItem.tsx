import Image from "next/image"
import Checkbox from "../ui/Checkbox"

type Props = {
  playlistId: string
  name: string
  imageUrl: string
  trackCount: number
  checked: boolean
  onCheck: (playlistId: string) => void
}

const PlaylistItem = ({ playlistId, name, imageUrl, trackCount, checked = false, onCheck }: Props) => {
  const onCheckedChange = () => {
    onCheck(playlistId)
  }
  
  return (
    <label
      htmlFor={`c-${playlistId}`}
      className={`
        transition
        flex items-center gap-2 
        rounded-lg p-2 pr-3 
        border
        cursor-pointer
        ${checked ? 'bg-emerald-900 border-emerald-700' : 'bg-slate-900 border-slate-700'}
        hover:bg-emerald-900 hover:border-emerald-700
        max-w-lg
        select-none
    `}>
      <Image
        src={imageUrl}
        width={48}
        height={48}
        alt="Playlist cover image"
        className="bg-slate-600 rounded h-12 w-12"
      />
      <div className="flex w-full flex-col gap-1 pr-2">
        <p>{name}</p>
        <p className="text-xs text-slate-200">{trackCount} tracks</p>
      </div>
      <Checkbox onCheckedChange={onCheckedChange} checked={checked} id={`c-${playlistId}`} />
    </label>
  )
}

export default PlaylistItem