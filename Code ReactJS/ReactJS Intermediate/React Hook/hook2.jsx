// React memo and friends. Để tránh ấn 1 button nhưng cả 2 đều render lại thì ta dùng React.memo
const CountButton = React.memo(function CountButton({onClick, count}) {
    console.log(count);
    return <button onClick={onClick}>{count}</button>
})
function DualCounter() {
    const [count1, setCount1] = React.useState(0)
    const increment1 = React.useCallback(() => setCount1(c => c + 1), [])
    const [count2, setCount2] = React.useState(0)
    const increment2 = React.useCallback(() => setCount2(c => c + 1), [])
    return (
        <div>
            <CountButton count={count1} onClick={increment1} />
            <CountButton count={count2} onClick={increment2} />
        </div>
    )
}
ReactDOM.render(<DualCounter />, document.getElementById("hooktest5"));