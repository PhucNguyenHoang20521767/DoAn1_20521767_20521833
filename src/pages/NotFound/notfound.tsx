import { NavLink } from "react-router-dom"

const notfound = () => {
    return (
        <>
            <div className="flex justify-center">
                <div className="grid-flow-col text-center">
                    <img className="pl-2" src="/src/assets/sorry.jpg" alt="sorry" />
                    <h1 className="text-4xl font-bold text-dark-0 my-4">404</h1>
                    <h2>Không tìm thấy trang!</h2>
                    <p>Xin lỗi vì sự bất tiện này</p>

                    <p>Về màn hình chính: <NavLink className="font-bold text-dark-0 underline decoration-double" to="/">Màn hình chính</NavLink>.</p>
                </div>
            </div>
        </>
        
    )
}

export default notfound