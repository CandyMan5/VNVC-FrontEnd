import React, {Fragment, useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import '../fonts/fontawesome-free-5.15.3-web/css/all.min.css';
import '../assets/stylesheets/datmuavx1.css'
import '../assets/stylesheets/base.css'
import '../assets/stylesheets/nhapthongtinvx.css'
import axios from 'axios';

const NhapThongTinVacXin_KHKTT_Login = () => {
    // const [name, setName] = useState('')
    const [vaccine, setVaccine] = useState({})
    const [gender, setGender] = useState('')
    // const [dateofbirth, setDateofbirth] = useState('')
    // const [phone, setPhone] = useState('')
    const [relationship, setRelationship] = useState('')
    // const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [district, setDistrict] = useState('')
    const [commune, setCommune] = useState('')
    const [place, setPlace] = useState('')
    const [vaccination_center, setVaccination_center] = useState('')
    let history = useHistory()
    const [VaccineList, setVaccineList] = useState([]);
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

        const fetchVaccineList = async () =>{
            try {
                const res = await axios.get(`http://vnvc.somee.com/api/vaccine/getall`) 
                                        .then(res => {
                                            setVaccineList(res.data)    
                                            console.log(res.data)
                                        })
                                        .catch(err => console.log(err));
            } catch (error) {
                console.log('Failed to fetch store list', error)
            }
        } 
        fetchVaccineList()
        fetchCartVaccineList()
    }, [])

    const DeleteVaccineCart = async (key) =>{
        try {
            const res = await axios(`https://localhost:44300/api/cart/deleteitem/${key}`,
                {method: 'delete'
            },
            { withCredentials: true }
            )
            .then(res => {
                window.location.reload()
            })
            .catch(err => console.log(err)
            );
        } catch (error) {
            console.log('Failed', error)
        }
    } 

    const AddVaccineToCart = (id,name,price,func,description,event) =>{
        try {
            axios({
                url: `https://localhost:44300/api/cart/addcart/2`,
                method: 'post',
                data:
                {
                    id: id,
                    name: name,
                    price: price,
                    function: func,
                    description: description,
                    active: true,
                    create_date: "2022-03-29T17:00:00Z"
                }
            },
            { withCredentials: true }
            )
            .then(res => {
                if(res.data===1)
                {
                    alert("Th??m s???n ph???m th??nh c??ng")
                    window.location.reload()
                }
                else alert("S???n ph???m ???? t???n t???i trong gi??? h??ng")
            })
            .catch(err => console.log(err)
            );
        } catch (error) {
            console.log('Failed', error)
        }
        event.preventDefault();
    } 

    function AddLocalCustomer(){
        let customer = {"name":JSON.parse(localStorage.getItem("Loyal_customer")).name,"gender":JSON.parse(localStorage.getItem("Loyal_customer")).gender,"dateofbirth":JSON.parse(localStorage.getItem("Loyal_customer")).date_of_birth,"phone":JSON.parse(localStorage.getItem("Loyal_customer")).phone,"relationship":relationship,
        "email":JSON.parse(localStorage.getItem("Loyal_customer")).email,"city":JSON.parse(localStorage.getItem("Loyal_customer")).city,"address":JSON.parse(localStorage.getItem("Loyal_customer")).address,"district":JSON.parse(localStorage.getItem("Loyal_customer")).district,"commune":JSON.parse(localStorage.getItem("Loyal_customer")).commune,"place":place,"vaccination_center":vaccination_center}
        return customer
    } 

    function handleSuccessfulAuth(){
        localStorage.setItem("customer",JSON.stringify(AddLocalCustomer()))
        alert("Th??m th??nh c??ng!")
    } 

    function AddLocalVaccine(id,name,price,func,description){
        let vaccine = {"id":id,"name":name,"price":price,"function":func,"description":description}
        return vaccine
    } 

    var total_money = 0
    const TotalAmount = (total) =>{
        total_money = total_money + total;
        localStorage.setItem("total_money",total_money)
    }

    return (
        <div>
            <div className="container_nhapthongtinvx">
                <div className="grid">
                    <div className="row">
                        <span className="nhapthongtinvx_heading-title">
                        ????NG K?? M??I TI??M 
                        </span>
                    </div>
                </div>
                <div className="grid">
                    <div className="row">
                        <div className="col-8">
                            <div className="row">
                                <Link to="/nhapthongtinvacxin_khtt" className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked/>
                                    <label className="form-check-label nhapthongtinvx_customertype" for="flexRadioDefault1">
                                        Qu?? kh??ch l?? th??nh vi??n kh??ch h??ng th??n thi???t
                                    </label>
                                </Link>
                                <Link to="/nhapthongtinvacxin_khktt" className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
                                    <label className="form-check-label nhapthongtinvx_customertype" for="flexRadioDefault2">
                                        Qu?? kh??ch ch??a l?? th??nh vi??n kh??ch h??ng th??n thi???t
                                    </label>
                                </Link>
                            </div>
                            <div className="row">
                                <span className="nhapthongtinvx_personalinfo-title">
                                    TH??NG TIN NG?????I ???????C TI??M
                                </span>
                                <span className="nhapthongtinvx_personalinfo-description">
                                    Qu?? kh??ch c?? th??? ????ng k?? c??ng l??c cho t???i ??a 5 ng?????i ti??m, VNVC ch??? th???c hi???n ti??m ch???ng cho Kh??ch h??ng c?? th??ng tin ????ng k?? tr??ng kh???p ho??n to??n v???i th??ng tin Qu?? Kh??ch cung c???p t???i ????y.
                                </span>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <span className="nhapthongtinvx_input-title">H??? v?? t??n *</span>
                                </div>
                                <div className="col-6">
                                <div>
                                    <span className="nhapthongtinvx_input-title">M???i quan h??? *</span>
                                    <div className="row"></div>
                                    <span className="nhapthongtinvx_mota-title">Kh??ch h??ng ch??? ???????c ????ng k?? v???c xin cho ng?????i th??n trong c??c quan h??? sau:</span>
                                </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <div className="input-group mb-3">
                                        <input
                                            type="text" 
                                            placeholder="H??? v?? t??n" 
                                            className="form-control nhapthongtinvx_input-item"
                                            value={JSON.parse(localStorage.getItem("Loyal_customer")).name}
                                        />  
                                        </div> 
                                </div>
                                <div className="col-6">
                                    <select value={relationship} onChange={(e)=> setRelationship(e.target.value)} className="form-select nhapthongtinvx_input-item" aria-label="Default select example">
                                        <option selected>Ch???n m???i quan h???</option>
                                        <option value="B???n Th??n">B???n th??n</option>
                                        <option value="Cha">Cha</option>
                                        <option value="M???">M???</option>
                                        <option value="??ng">??ng</option>
                                        <option value="B??">B??</option>
                                        <option value="Anh">Anh</option>
                                        <option value="Ch???">Ch???</option>
                                        <option value="Em">Em</option>
                                        <option value="V???">V???</option>
                                        <option value="Ch???ng">Ch???ng</option>
                                        <option value="Con">Con</option>
                                        <option value="C??ng H??? Kh???u">C??ng h??? kh???u</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <span className="nhapthongtinvx_input-title">Ng??y sinh *</span>
                                </div>
                                <div className="col-6">
                                    <span className="nhapthongtinvx_input-title">Gi???i t??nh *</span>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <div className="input-group mb-3">
                                        <input 
                                            type="text" 
                                            placeholder="Ng??y sinh" 
                                            className="form-control nhapthongtinvx_input-item"
                                            value={JSON.parse(localStorage.getItem("Loyal_customer")).date_of_birth.substring(0,10)}
                                            required
                                        />  
                                    </div>
                                </div>
                                <div className="col-6">
                                    <input 
                                            type="text" 
                                            placeholder="Ng??y sinh" 
                                            className="form-control nhapthongtinvx_input-item"
                                            value={JSON.parse(localStorage.getItem("Loyal_customer")).gender}
                                            required
                                        />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <span className="nhapthongtinvx_input-title">S??? ??i???n tho???i *</span>
                                    <div className="row"></div>
                                    <span className="nhapthongtinvx_mota-title">N???u ng?????i ???????c ti??m ch??a c?? S??T, vui l??ng ??i???n S??T c???a cha/m??? ho???c ng?????i gi??m h??? s??? nh???n m?? ti??m ch???ng</span>
                                </div>
                                <div className="col-6">
                                    <span className="nhapthongtinvx_input-title">Email</span>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <div className="input-group mb-3">
                                        <input 
                                            type="text" 
                                            placeholder="S??? ??i???n tho???i" 
                                            className="form-control nhapthongtinvx_input-item"
                                            value={JSON.parse(localStorage.getItem("Loyal_customer")).phone}
                                            required
                                        />  
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="input-group mb-3">
                                        <input 
                                            type="email" 
                                            placeholder="Email" 
                                            className="form-control nhapthongtinvx_input-item"
                                            value={JSON.parse(localStorage.getItem("Loyal_customer")).email}
                                            required
                                        />  
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <span className="nhapthongtinvx_input-title">?????a ch??? *</span>
                            </div>
        
                            <div className="row">
                                <div className="input-group mb-3">
                                    <input 
                                        type="text" 
                                        placeholder="?????a ch???" 
                                        className="form-control nhapthongtinvx_input-item"
                                        value={JSON.parse(localStorage.getItem("Loyal_customer")).address}
                                        required    
                                    />  
                                </div>
                            </div>
        
                            <div className="row align-items-start">
                                <div className="col-4">
                                    <span className="nhapthongtinvx_input-title">
                                        T???nh/Th??nh *
                                    </span>
                                </div>
                                <div className="col-4">
                                    <span className="nhapthongtinvx_input-title">
                                        Qu???n/Huy???n *
                                    </span>
                                </div>
                                <div className="col-4">
                                    <span className="nhapthongtinvx_input-title">
                                        Ph?????ng/X?? *
                                    </span>
                                </div>
                            </div>
        
                            <div className="row">
                                <div className="col-4">
                                    <div className="input-group mb-3">
                                        <input 
                                            type="text" 
                                            placeholder="T???nh/th??nh" 
                                            className="form-control"
                                            value={JSON.parse(localStorage.getItem("Loyal_customer")).city}
                                            required
                                        />  
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="input-group mb-3">
                                        <input 
                                            type="text" 
                                            placeholder="Qu???n/huy???n" 
                                            className="form-control"
                                            value={JSON.parse(localStorage.getItem("Loyal_customer")).district}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="input-group mb-3">
                                        <input 
                                            type="text" 
                                            placeholder="Ph?????ng/x??" 
                                            className="form-control"
                                            value={JSON.parse(localStorage.getItem("Loyal_customer")).commune}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <span className="nhapthongtinvx_personalinfo-title">CH???N ?????A ??I???M MONG MU???N TI??M</span>
                            </div>
        
                            <div className="row">
                                <div className="col-6">
                                    <span className="nhapthongtinvx_input-title">T???nh/Th??nh *</span>
                                </div>
                                <div className="col-6">
                                <div>
                                    <span className="nhapthongtinvx_input-title">Trung t??m VNVC g???n qu?? kh??ch *</span>
                                </div>
                                </div>
                            </div>
        
                            <div className="row">
                                <div className="col-6">
                                    <select value={place} onChange={(e)=> setPlace(e.target.value)} className="form-select nhapthongtinvx_input-item" aria-label="Default select example">
                                        <option value="Th??nh Ph??? H??? Ch?? Minh">Th??nh Ph??? H??? Ch?? Minh</option>
                                        <option value="Th??nh Ph??? H?? N???i">Th??nh Ph??? H?? N???i</option>
                                        <option value="Th??nh Ph??? ???? N???ng">Th??nh Ph??? ???? N???ng</option>
                                        <option value="Th??nh Ph??? H???i Ph??ng">Th??nh Ph??? H???i Ph??ng</option>
                                        <option value="Th??nh Ph??? C???n Th??">Th??nh Ph??? C???n Th??</option>
                                    </select>
                                </div>
                                <div className="col-6">
                                    <select value={vaccination_center} onChange={(e)=> setVaccination_center(e.target.value)} className="form-select nhapthongtinvx_input-item" aria-label="Default select example">
                                        <option selected>Trung t??m VNVC</option>
                                        <option value="VNVC B??nh Th???nh">VNVC B??nh Th???nh</option>
                                        <option value="VNVC Th??? ?????c">VNVC Th??? ?????c</option>
                                        <option value="VNVC T??n B??nh">VNVC T??n B??nh</option>
                                        <option value="VNVC Qu???n 2">VNVC Qu???n 2</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <span className="nhapthongtinvx_personalinfo-title">CH???N V???C XIN CHO NG?????I TI??M</span>
                                <span className="nhapthongtinvx_mota-title">Qu?? kh??ch c?? th??? ????ng k?? th??m c??c lo???i v???c xin kh??c v?? s??? d???ng cho nhi???u l???n ti??m kh??c nhau.</span>
                            </div>

                            <div className="row">
                                <div className="col-8">
                                    <select value={vaccine} onChange={(e)=>setVaccine(e.target.value)} className="form-select nhapthongtinvx_chosen_vacxin-item" aria-label="Default select example">
                                    {VaccineList.map(arr => {
                                        return (
                                            <option value={JSON.stringify(AddLocalVaccine(arr.id,arr.name,arr.price,arr.function,arr.description))}>{arr.name}</option>
                                        )})}
                                        
                                    </select>
                                </div>
                                <div className="col-4">
                                    <button onClick={()=>AddVaccineToCart(JSON.parse(vaccine).id,JSON.parse(vaccine).name,JSON.parse(vaccine).price,JSON.parse(vaccine).func,JSON.parse(vaccine).description)}  type="button" className="btn btn-outline-primary nhapthongtinvx_btn_kiemtra">TH??M V???C XIN</button>        
                                </div>
                            </div>

                            <div className="row">
                                <span className="nhapthongtinvx_personalinfo-title">DANH S??CH V???C XIN ????NG K??</span>
                            </div>

                            <div className="row">
                            {CartVaccineList.map(cart => {
                                return (
                                    <div className="col-4 align-items-center">
                                    <div className="nhapthongtinvx-package-item">
                                        <div className="nhapthongtinvx-package-item__wrap">
                                            <h4 className="nhapthongtinvx-package-item__name">{cart.name}</h4>
                                            <span className="nhapthongtinvx-package-item__price"><i className="nhapthongtinvx-package-item__icon fa fa-tag"></i>{cart.price} VN??</span>
                                        </div>
                                        <span className="nhapthongtinvx-package-item__description1">Ph??ng b???nh:</span>
                                        <span className="nhapthongtinvx-package-item__description2">{cart.function} </span>
                                    </div>       
                                </div>
                                )})}
                            </div>
                            
                            <div className="row">
                                <div className="col-4"></div>
                                <div className="col-4 nhapthongtinvx_btn_nhaplaithongtin_nltt">
                                    <button type="button" className="btn btn-outline-primary nhapthongtinvx_btn_nhaplaithongtin">NH???P L???I TH??NG TIN</button>
                                </div>
                                <div className="col-4 nhapthongtinvx_btn_tieptuc_tt">
                                    <button 
                                        onClick={()=>handleSuccessfulAuth()} 
                                        type="button" className="btn btn-outline-primary nhapthongtinvx_btn_tieptuc">TI???P T???C</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="nhapthongtinvx-chosen-item">
                                <h4 className="nhapthongtinvx-chosen-item__title"><i className="nhapthongtinvx-chosen-item__icon far fa-clipboard-list"></i>DANH S??CH V???C XIN CH???N MUA </h4>
                                {CartVaccineList.map(cart => {
                                return (
                                    <div>
                                        <div className="nhapthongtinvx-chosen-item__info">
                                            <div class="vacxin-chosen-item__name-wrap">
                                                <span class="nhapthongtinvx-chosen-item__name">{cart.name}</span>
                                                <i onClick={()=> DeleteVaccineCart(cart.key)} class="nhapthongtinvx-chosen-item__name-icon fas fa-times"></i>
                                            </div>

                                            <span className="nhapthongtinvx-chosen-item__price">{cart.price} VN
                                            ??</span>
                                        </div>
                                        <script>
                                            {TotalAmount(cart.price)}
                                        </script>
                                    </div>
                                )})}
                                <div className="nhapthongtinvx_chosen_item_total">   
                                    <span className="nhapthongtinvx-chosen-item__tongtien_title">T???NG TI???N</span>
                                    <span className="nhapthongtinvx-chosen-item__tongtien_total">{localStorage.getItem("total_money")} VN??</span>
                                </div>
                                <button onClick={()=> history.push("/thanhtoan")} type="button" className="btn btn-outline-primary nhapthongtinvx_chosen-item__xemdktt">XEM ??I???U KHO???N V?? THANH TO??N</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div> 
        </div>
    );
}

export default NhapThongTinVacXin_KHKTT_Login;