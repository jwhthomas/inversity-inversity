export default function ListItem({ children }){
    return (
        <li className="relative pl-5 before:content-['+'] before:absolute before:left-0 before:text-gray-400">
            {children}
        </li>
    )
}