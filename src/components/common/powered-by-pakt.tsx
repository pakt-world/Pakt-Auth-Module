import PaktIcon from "../../assets/images/pakt.png";

const PoweredByPakt = ({ className }: { className?: string }) => {
    return (
        <a
            href="https://pakt.world"
            target="_blank"
            className={`pka:flex pka:cursor-pointer pka:items-center pka:text-title ${className}`}
            rel="noreferrer"
        >
            <p className="pka:text-base pka:text-white">Powered by</p>{" "}
            <img width={92} height={36} alt="Pakt" src={PaktIcon} />
        </a>
    );
};

export default PoweredByPakt;
