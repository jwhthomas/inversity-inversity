export default function Button({ text, className}){
    return (
        <div className={`cursor-pointer bg-[#c62e65] rounded-full font-semibold text-white py-1 px-4 w-fit h-fit ` + className}>{text}</div>
    );
}