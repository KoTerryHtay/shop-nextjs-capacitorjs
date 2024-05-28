"use client";

interface PropsType {
  id: number;
  name: string;
  total: number;
  deleteList: (id: number) => void;
  setId: (id: number) => void;
}

export default function Lists({
  id,
  name,
  total,
  deleteList,
  setId,
}: PropsType) {
  return (
    <div
      onClick={() => setId(id)}
      className="bg-[#222831] text-[#EEEEEE] p-2 rounded-md font-semibold text-center hover:cursor-pointer shadow-sm shadow-black active:shadow-none active:bg-[#D9D9D9] active:text-[#000000] space-x-2 w-auto"
    >
      <span>{name}</span>
      <span
        className={`text-xs ${
          total
            ? " bg-[#393E46] p-0.5 px-2 rounded border border-[#393E46]"
            : " bg-red-700 p-0.5 px-2 rounded border border-red-600"
        }`}
      >
        {total ? `ပစ္စည်း( ${total} )မျိုးရှိသည်` : "လက်ကျန်မရှိပါ"}
      </span>
      {!total && (
        <button
          className=" bg-red-700 p-0.5 px-2 rounded text-xs"
          onClick={(e) => {
            // e.preventDefault();
            e.stopPropagation();
            deleteList(id);
          }}
        >
          delete
        </button>
      )}
    </div>
  );
}
