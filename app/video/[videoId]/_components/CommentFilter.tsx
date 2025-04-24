import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function CommentFilter({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="flex items-center justify-end mb-2 w-full">
      <Select defaultValue="all" onValueChange={onChange} value={value}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="comment filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="positive">긍정적</SelectItem>
            <SelectItem value="negative">부정적</SelectItem>
            <SelectItem value="neutral">중립</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default CommentFilter;
