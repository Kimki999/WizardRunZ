type Prop = {
    className?: string
    score: number
}

export default function ScoreCounter(prop:Prop) {

    return (
        <h1 className={`bg-black/50 p-3 border border-blue-100/70 text-xl rounded-2xl text-white ${prop.className || ""}`}>
            passed : { prop.score } ☆
        </h1>
    )
}
