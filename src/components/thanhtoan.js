import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import '../fonts/fontawesome-free-5.15.3-web/css/all.min.css';
import '../assets/stylesheets/thanhtoan.css'



const Thanhtoan = () => {
    let history = useHistory()
    const [payment_name, setName] = useState('')
    const [payment_phone, setPhone] = useState('')
    const [payment_email, setEmail] = useState('')
    const [payment_cccd, setCCCD] = useState('')
    const [payment_address, setAddress] = useState('')
    const [payment_city, setCity] = useState('')
    const [payment_district, setDistrict] = useState('')
    const [payment_commune, setCommune] = useState('')
    const [payment_type, setType] = useState('');
    const [CartVaccineList, setCartVaccineList] = useState([]);
    useEffect(() => {
        const fetchCartVaccineList = async () =>{
            try {
                const res = await axios.get(`https://localhost:44300/api/cart/getcart/2`) 
                                        .then(res => {
                                            setCartVaccineList(res.data)    
                                            console.log(res.data)
                                        })
                                        .catch(err => console.log(err));
            } catch (error) {
                console.log('Failed to fetch store list', error)
            }
        } 
        fetchCartVaccineList();
    }, [])

    var total_money = 0
    const TotalAmount = (total) =>{
        total_money = total_money + total;
        localStorage.setItem("total_money",total_money)
    }
    const Payment = (event) =>{
        try {
            axios({
                url: `https://localhost:44300/api/formregistor/insertformregistor`,
                method: 'post',
                    data:
                    {
                        customers: [
                            {
                                customer: JSON.parse(localStorage.getItem("customer")),
                                item: JSON.parse(localStorage.getItem("item"))
                            }
                        ],
                        payment_name: payment_name,
                        payment_phone: payment_phone,
                        payment_cccd: payment_cccd,
                        payment_email: payment_email,
                        payment_address: payment_address,
                        payment_city: payment_city,
                        payment_district: payment_district,
                        payment_commune: payment_commune,
                        payment_type: payment_type
                        
                    }
            },
            { withCredentials: true }
            )  
            .then(res => {
                history.push("/thongbao")
                console.log(res.data)
            })
            .catch(err => console.log(err));
        } catch (error) {
            console.log('Failed to fetch', error)
        }
        event.preventDefault();
    } 

    return (
        <div>
            <div className="main-content">
                <div className="title">
                    <h1 className="text-center">
                        <span>????NG K?? M??I TI??M (THANH TO??N)</span>
                    </h1>
                    <div className="grid">
                        <div className="row">
                            <div className="col-8">
                                <div className="row">
                                    <span className="payment_buyer_information">
                                        TH??NG TIN NG?????I MUA
                                    </span>
                                    <span className="payment_buyer_description">
                                        Th??ng tin n??y ????? ch??ng t??i li??n l???c khi c???n thi???t. Qu?? kh??ch c?? th??? ????ng k?? v???c xin cho 5 ng?????i c??ng l??c, t???t c??? th??ng tin qu?? kh??ch c???n cung c???p ch??nh x??c ????? ch??ng t??i x??c th???c khi ?????n trung t??m
                                    </span>
                                </div>
                                <div className="row payment_items">
                                    <div className="col-6">
                                        <span className="payment_buyer_input_title">
                                            H??? v?? t??n *
                                        </span>
                                    </div>
                                    <div className="col-6">
                                        <span className="payment_buyer_input_title">
                                            S??? ??i???n tho???i *
                                        </span>
                                    </div>
                                </div>
                                <div className="row payment_items">
                                    <div className="col-6">
                                        <input value={payment_name} onChange={(e)=> setName(e.target.value)}
                                         type="text" className="form-control payment_item_title" placeholder="H??? v?? t??n *"/>
                                    </div>
                                    <div className="col-6">
                                        <input value={payment_phone} onChange={(e)=> setPhone(e.target.value)} 
                                        type="text" className="form-control payment_item_title" placeholder="S??? ??i???n tho???i *"/>
                                    </div>
                                </div>
                                <div className="row payment_items">
                                    <div className="col-6">
                                        <span className="payment_buyer_input_title">
                                            Email *
                                        </span>
                                    </div>
                                    <div className="col-6">
                                        <span className="payment_buyer_input_title">
                                            CMND/ CCCD/ PASSPORT *
                                        </span>
                                    </div>
                                </div>
                                <div className="row payment_items">
                                    <div className="col-6">
                                        <input value={payment_email} onChange={(e)=> setEmail(e.target.value)} 
                                         type="text" className="form-control payment_item_title" placeholder="Email *"/>
                                    </div>
                                    <div className="col-6">
                                        <input value={payment_cccd} onChange={(e)=> setCCCD(e.target.value)} 
                                         type="text" className="form-control payment_item_title" placeholder="CMND/ CCCD/ PASSPORT *"/>
                                    </div>
                                </div>
                                <div className="row payment_items">
                                    <span className="payment_buyer_input_title">
                                        ?????a ch??? *
                                    </span>
                                </div>
                                <div className="row payment_items_address">
                                    <input value={payment_address} onChange={(e)=> setAddress(e.target.value)}  
                                    type="text" className="form-control payment_item_title" placeholder="S??? nh??, t??n ???????ng (Theo h??? kh???u/CMND)"/>
                                </div>
                                <div className="row payment_items">
                                    <div className="col-4">
                                        <span className="payment_buyer_input_title">
                                           T???nh/ th??nh *
                                        </span>
                                    </div>
                                    <div className="col-4">
                                        <span className="payment_buyer_input_title">
                                            Qu???n/Huy???n *
                                        </span>
                                    </div>
                                    <div className="col-4">
                                        <span className="payment_buyer_input_title">
                                            Ph?????ng/X?? *
                                        </span>
                                    </div>
                                </div>
                                <div className="row payment_items">
                                    <div className="col-4">
                                        <input value={payment_city} onChange={(e)=> setCity(e.target.value)}  
                                        type="text" className="form-control payment_item_title" placeholder="T???nh/ th??nh *"/>
                                    </div>
                                    <div className="col-4">
                                        <input value={payment_district} onChange={(e)=> setDistrict(e.target.value)}  
                                        type="text" className="form-control payment_item_title" placeholder="Qu???n/Huy???n *"/>
                                    </div>
                                    <div className="col-4">
                                        <input value={payment_commune} onChange={(e)=> setCommune(e.target.value)}  
                                        type="text" className="form-control payment_item_title" placeholder="Ph?????ng/X?? *"/>
                                    </div>
                                </div>
                                <div className="row payment_items">
                                    <span className="payment_type_title">
                                        CH???N PH????NG TH???C THANH TO??N
                                    </span>
                                </div>
                                <div className="row">
                                    <div className="form-check">
                                        <input value={"Thanh to??n b???ng th??? thanh to??n n???i ?????a (ATM)"} onChange={(e)=> setType(e.target.value)} className="form-check-input pament-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                                        <label className="form-check-label payment_check_type" >
                                            Thanh to??n b???ng th??? thanh to??n n???i ?????a (ATM)
                                        </label>
                                      </div>
                                      <div className="form-check">
                                        <input value={"Thanh to??n t???i trung t??m"} onChange={(e)=> setType(e.target.value)} className="form-check-input pament-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
                                        <label className="form-check-label payment_check_type" >
                                            Thanh to??n b???ng th??? VISA/MASTER/JCB
                                        </label>
                                      </div>
                                      <div className="form-check">
                                        <input value={"Thanh to??n t???i trung t??m"} onChange={(e)=> setType(e.target.value)} className="form-check-input pament-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" checked/>
                                        <label className="form-check-label payment_check_type" >
                                            Thanh to??n b???ng th??? th??nh vi??n
                                        </label>
                                      </div>
                                      <div className="form-check">
                                        <input value={"Thanh to??n t???i trung t??m"} onChange={(e)=> setType(e.target.value)} className="form-check-input pament-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" checked/>
                                        <label className="form-check-label payment_check_type" >
                                            Thanh to??n qua chuy???n kho???n
                                        </label>
                                      </div>
                                      <div className="form-check">
                                        <input value={"Thanh to??n t???i trung t??m"} onChange={(e)=> setType(e.target.value)} className="form-check-input pament-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault5" checked/>
                                        <label className="form-check-label payment_check_type" >
                                            Thanh to??n t???i trung t??m
                                        </label>
                                      </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="payment_vacxin-chosen-item">
                                    <h4 className="payment_vacxin-chosen-item__title"><i className="payment_vacxin-chosen-item__icon far fa-clipboard-list"></i>DANH S??CH V???C XIN CH???N MUA </h4>
                                    {CartVaccineList.map(cart => {
                                        return (
                                            <div>
                                                <div className="payment_vacxin-chosen-item__info">
                                                <span className="payment_vacxin-chosen-item__name">{cart.name}</span>
                                                <span className="payment_vacxin-chosen-item__price">{cart.price} VN??</span>
                                                </div>
                                                <div className="payment_vacxin-chosen-item__local">
                                                    <span className="payment_vacxin-chosen-item__local_address">{cart.vaccine_center}</span>
                                                    <span className="payment_vacxin-chosen-item__location">{cart.place}</span>
                                                </div>
                                                <script>
                                                    {TotalAmount(cart.price)}
                                                </script>
                                            </div>
                                        )})}
                                    
                                    <div className="payment_vacxin-chosen-item__total">
                                        <span className="payment_vacxin-chosen-item__name__total">T???NG TI???N</span>
                                        <span className="payment_vacxin-chosen-item__price__total">{localStorage.getItem("total_money")} VN??</span>
                                    </div>
                                    
                                    <form onSubmit={Payment}>
                                        <button type="submit" className="btn btn-outline-secondary payment_vacxin-chosen-item_dk_btn">THANH TO??N</button>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    );
}

export default Thanhtoan;