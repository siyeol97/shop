import { Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { changeName, increase } from "./../store/userSlice"
import { changeCount } from "../store";


function Cart(){

    let user = useSelector((state)=>{ return state.user });
    let cart = useSelector((state)=>{ return state.cart });
    let dispatch = useDispatch();

    return(
        <div>
            { user.name }, { user.age }의 장바구니
            <button onClick={ ()=>{ dispatch(changeName())} }>이름</button>
            <button onClick={ ()=>{ dispatch(increase(100))} }>나이</button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.map((data, i)=>{
                            return(
                                <tr key={i}>
                                    <td>{data.id}</td>
                                    <td>{data.name}</td>
                                    <td>{data.count}</td>
                                    <td>
                                        <button onClick={()=>{
                                            dispatch(changeCount({itemId : data.id, increment : 1}))
                                        }}>+</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Cart