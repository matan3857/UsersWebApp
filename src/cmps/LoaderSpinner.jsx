import { TailSpin } from 'react-loader-spinner'

export function LoaderSpinner() {
    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    return (
        <div style={style}>
            <TailSpin
                color="#302f2f"
                height={90}
                width={90} />
        </div>
    )
}
