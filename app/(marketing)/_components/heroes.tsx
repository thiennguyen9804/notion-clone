import Image from "next/image";

export default function Heroes() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px]
md:h-[400px] md:w-[400px]
          ">
          <Image
            src="/documents.png"
            fill
            alt="Documents"
            className="object-contain"
          />

        </div>

        <div className="relative h-[400px] w-[400px] hidden md:block">
          <Image
            src="/reading.png"
            fill
            alt="Reading"
            className="object-contain"
          />

        </div>
      </div>
    </div>
  )
}

