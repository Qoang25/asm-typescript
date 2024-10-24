const URL_API =`http://localhost:3000`;
type TSan_pham = {
    id: number,
    name: string,
    description: string,
    img: string,
    price: string,
    deal: string,
    value: number,
    img_chirld: number[]
}

interface IThuong_hieu { id: number, description: string, img:string }
interface ITien_ich{ id: number, name: string, img:string}
interface ISan_pham_footer { id:number, name:string, img:string, price:string , sell:string}
interface IV_menu{ id: number, description: string, img:string}

const lay_v_menu = async () => {
    let v_menu_arr: IV_menu[] = [];
    v_menu_arr = await fetch(URL_API + `/v_menu`)
                        .then(response => {
                            if (response.ok == false) throw Error( response.statusText);
                            return response.json()
                         })
                        .then(d => d);
    // console.log(v_menu_arr);
    let str: string = ``;
    v_menu_arr.forEach(vm => {
        str+=` <div class="vmenu">
                        <a href="#${vm.id}"> <img src="image/${vm.img}"></a>
                        <br>
                        ${vm.description}
                    </div> `
    })
    // console.log(str);
    return str;
}

const lay_san_pham = async () => {
    let san_pham_arr: TSan_pham[];
    san_pham_arr = await fetch(URL_API + `/san_pham`)
                        .then(response => {
                            if (response.ok == false) throw Error( response.statusText);
                            return response.json()
                         })
                        .then(d => d);
    let str: string = ``;
    san_pham_arr.forEach(sp => {
        str+=` <a href="chitiet.html?id=${sp.id}">
                    <div class="crop-15">
                        <div class="hop"">
                            <input type="hidden" value="${sp.id}">
                            <img class="image" src="image/${sp.img}" >
                            <div class="name">${sp.name}</div>
                            <div class="price1">${sp.price}</div>
                            <span class="giamgia"><del>${sp.deal}</del></span>
                            <input type="hidden" value="${sp.value}">
                        </div>
                    </div>
                </a>`
    })
    return str;
}
const lay_thuong_hieu = async () => {
    let thuong_hieu_arr: IThuong_hieu[];
    thuong_hieu_arr = await fetch(URL_API + `/thuong_hieu`)
                        .then(response => {
                            if (response.ok == false) throw Error( response.statusText);
                            return response.json()
                         })
                        .then(d => d);
    let str: string = ``;
    thuong_hieu_arr.forEach(th => {
        str+=` <div>
                    <a href="#${th.id}">
                        <div class="crop-15">
                            <div class="hop1">
                                <input type="hidden" value="${th.id}">
                                <img class="image" src="image/${th.img}">
                                <div class="name">${th.description}</div>
                            </div>
                        </div>
                    </a>
                </div>`
    })
    return str;
}
const lay_tien_ich = async () => {
    let tien_ich_arr: ITien_ich[];
    tien_ich_arr = await fetch(URL_API + `/tien_ich`)
                        .then(response => {
                            if (response.ok == false) throw Error( response.statusText);
                            return response.json()
                         })
                        .then(d => d);
    let str: string = ``;
    tien_ich_arr.forEach(ti => {
        str+=` <div class="box" style="cursor: pointer;">
                        <div class="cmenu">
                            <input type="hidden" value="${ti.id}">
                            <a href="#1"><img src="image/${ti.img}"></a>
                            <p>${ti.name}</p>
                        </div>
                    </div>
                    `
    })
    return str;
}
const lay_san_pham_footer = async () => {
    let sp_footer: ISan_pham_footer[];
    sp_footer = await fetch(URL_API + `/san_pham_footer`)
                        .then(response => {
                            if (response.ok == false) throw Error( response.statusText);
                            return response.json()
                         })
                        .then(d => d);
    let str: string = ``;
    sp_footer.forEach(spf => {
        str+=` <a href="#">
                    <div class="crop-sanpham">
                        <div class="hopsanpham">
                            <input type="hidden" value="${spf.id}">
                            <img src="image/${spf.img}">
                            <div class="name"><br> ${spf.name}</div>
                            <div class="price1"><b>${spf.price}</b></div>
                            <p>${spf.sell}</p>
                        </div>
                    </div>
                </a>
                    `
    })
    return str;
}
const lay_1sp = async (id:number) => {
    let sp_arr:TSan_pham[];
    let url = URL_API + `/san_pham?id=${id}`;
    sp_arr = await fetch(url).then( res => res.json()).then ( d => d);
    let str=``;
    sp_arr.forEach( sp => str+= `
        <div class="dienthoai">
                    <img src="image/${sp.img}" id="Anh">
                </div>
                <div class="chuyencanh" id="chuyenAnh">
                    <img src="image/${sp.img_chirld[0]}" class="oppo1" id="oppo1">
                    <img src="image/${sp.img_chirld[1]}" class="oppo2" id="oppo2">
                    <img src="image/${sp.img_chirld[2]}" class="oppo3" id="oppo3">
                </div>
                <div class="thongtin">
                    <h2 id="tenSP">${sp.name}</h2>
                    <h3 id="mota">${sp.description}</h3>
                    <div class="giadt" id="giaSP">${sp.price}</div>
                     <input type="hidden" value="${sp.value}"> 
                </div>
                <div class="soluong1">  
                    <p>Chọn số lượng</p>
                    <form action="">
                        <input type="number" min="0" step="1" class="soluong" placeholder="0"/>
                        <button type="submit" class="themvaogio" style="cursor: pointer;" >Thêm vào giỏ</button>
                        <button type="submit" class="muahang" style="cursor: pointer;">Mua hàng</button>
                    </form>
                </div>
                `);
    document.querySelector('.dtoppo').innerHTML = str;

    return str;
}

export {lay_v_menu, lay_san_pham, lay_thuong_hieu, lay_tien_ich, lay_san_pham_footer, lay_1sp};