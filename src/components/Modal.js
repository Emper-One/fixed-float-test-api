import React from 'react'

const Modal = ({ order, show, setShow }) => {
    return (
    <div className="modal" style={{display: show ? 'block' : 'none'}}>
        <div className="modal-content">
        <span onClick={(e) => {
            e.preventDefault()
            setShow(false)}} className="close">&times;</span>
         <table>
            <tr>
                <th>id</th>
                <th>start</th>
                <th>type</th>
                <th>step</th>
                <th>reg</th>
                <th>expiration</th>
                <th>left</th>
                <th>status</th>
                <th>statusText</th>
            </tr>
            <tr>
                <td>{order?.id}</td>
                <td>{order?.start ? 'OK' : 'NO'}</td>
                <td>{order?.type}</td>
                <td>{order?.step}</td>
                <td>{order?.reg}</td>
                <td>{order?.expiration}</td>
                <td>{order?.left}</td>
                <td>{order?.status}</td>
                <td>{order?.statusText}</td>
            </tr>
        </table>
        <div className='flex flex-col justify-center items-center mt-5'>
            <div className='flex'><p>Send: </p><p className='text-orange-600'>{order?.from.amount}</p><p> {order?.from.symbol}</p></div>
            <div className='flex'><p> to the adress:</p><p className='text-orange-600'>{order?.from.address}</p></div>
        </div>
        <div className='flex flex-col justify-center items-center mt-5'>
            <p>Recive address BNB</p>
            <p>{order?.to.address}</p>
        </div>
    </div>

</div>
    )
}

export default Modal