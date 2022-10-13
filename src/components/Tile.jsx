export default function Tile(props) {
    return (
        <button onClick={props.onClick} disabled={props.disabled} className="custom-button hover:bg-blue-500 hover:text-white hover:border-transparent">{props.value}</button>
    )
}