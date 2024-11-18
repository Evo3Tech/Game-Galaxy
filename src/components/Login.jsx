import heroImg from "../imgs/hero.png"

export function Login(){
    return(
        <>
        <div className="left login">
            <img src={heroImg} alt="" />

        </div>
        <div className="right">
            <h1>Login</h1>
            <form action="" method="post">
                <input type="text" placeholder="username"/>
                <input type="password" placeholder="password"/>
                <button>Login</button>
            </form>
        </div>
        </>
    )
}