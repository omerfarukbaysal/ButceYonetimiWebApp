import React, { Fragment, useEffect, useState } from 'react'
import { Tabs, Tab, Content } from "./Tabs";
import { Link } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux';
import { getGelir, setGelir, deleteGelir } from "../redux/actions/gelirAction"
import { getGider, setGider, deleteGider } from "../redux/actions/giderAction"
import { getHesap } from "../redux/actions/hesapAction"

import { setKategori, getKategori } from "../redux/actions/kategoriAction"
import Spinner from "../Spinner"
function GelirGider() {
    const [tab, setTab] = useState(3);
    const [kategoriModal, setKategoriModal] = useState(false);
    const dispatch = useDispatch();
    const allGelir = useSelector(state => state.gelirReducer.gelir);
    const allGider = useSelector(state => state.giderReducer.gider);
    const allHesap = useSelector(state => state.hesapReducer.hesap);
    const allKategori = useSelector(state => state.kategoriReducer.kategori);

    const gelirLoading = useSelector(state => state.hesapReducer.loading);
    const giderLoading = useSelector(state => state.hesapReducer.loading);
    const hesapLoading = useSelector(state => state.hesapReducer.loading);
    const kategoriLoading = useSelector(state => state.hesapReducer.loading);



    useEffect(() => {
        dispatch(getGider());
        dispatch(getGelir());
        dispatch(getHesap());
        dispatch(getKategori());
    }, []);

    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    function formatDate(isoDate) {
        var d = new Date(isoDate);
        var months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]
        var days = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"]
        return (d.getDate().toString() + " " + months[parseInt(d.getMonth())] + " " + d.getFullYear() + " " + days[d.getDay() - 1] + " " + addZero(d.getHours()) + ":" + addZero(d.getMinutes()));
    };


    const changeTab = (index) => {
        setTab(index)
    }

    const [kategoriFormData, setKategoriFormData] = useState({
        kategoriAdi: ""
    })

    const { kategoriAdi } = kategoriFormData;

    const onKategoriSubmit = (e) => {
        e.preventDefault();
        dispatch(setKategori({ kategoriAdi }));
    }

    const onKategoriChange = (e) => {
        setKategoriFormData({ ...kategoriFormData, [e.target.name]: e.target.value });
    }




    const [giderFormData, setGiderFormData] = useState({
        giderHesap: "",
        giderKategori: "",
        giderBaslik: "",
        giderMiktar: "",
        giderTarih: ""
    })

    const { giderHesap, giderKategori, giderBaslik, giderMiktar, giderTarih } = giderFormData;

    const onGiderSubmit = (e) => {
        e.preventDefault();
        dispatch(setGider({ hesap: giderHesap, kategori: giderKategori, baslik: giderBaslik, miktar: giderMiktar, tarih: giderTarih }));
    }

    const onGiderChange = (e) => {
        setGiderFormData({ ...giderFormData, [e.target.name]: e.target.value });
    }



    const [gelirFormData, setGelirFormData] = useState({
        gelirHesap: "",
        gelirBaslik: "",
        gelirMiktar: "",
        gelirTarih: ""
    })

    const { gelirHesap, gelirBaslik, gelirMiktar, gelirTarih } = gelirFormData;

    const onGelirSubmit = (e) => {
        e.preventDefault();
        dispatch(setGelir({ hesap: gelirHesap, baslik: gelirBaslik, miktar: gelirMiktar, tarih: gelirTarih }));
    }

    const onGelirChange = (e) => {
        setGelirFormData({ ...gelirFormData, [e.target.name]: e.target.value });
    };


    return (
        <div>
            <Tabs>
                <Tab onClick={() => changeTab(1)} active={tab === 1}>
                    Gelir Ekle
                </Tab>
                <Tab onClick={() => changeTab(2)} active={tab === 2}>
                    Gider Ekle
                </Tab>
                <Tab onClick={() => changeTab(3)} active={tab === 3}>
                    Gelir Detay
                </Tab>
                <Tab onClick={() => changeTab(4)} active={tab === 4}>
                    Gider Detay
                </Tab>
                <Tab onClick={() => changeTab(5)} active={tab === 5}>
                    Kategori
                </Tab>
            </Tabs>
            <div class="my-8">
                <Content active={tab === 1}>
                    <div className="text-black-100 dark:text-gray-50">
                        <div class="flex flex-col bg-gray-100">
                            <div class="grid place-items-center mx-2 my-20">
                                <div class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg">
                                    <h2 class="text-center font-semibold text-3xl lg:text-4xl text-gray-800">Gelir Ekle</h2>
                                    <form class="mt-10" onSubmit={(e) => onGelirSubmit(e)}>
                                        <label for="" class="block text-xs font-semibold text-gray-600 uppercase">Gelir Başlığı</label>
                                        <input name="gelirBaslik" onChange={(e) => { onGelirChange(e); }} value={gelirBaslik} placeholder="Gelir Başlığı Giriniz" class="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200" required />
                                        <label for="" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Miktar</label>
                                        <input name="gelirMiktar" onChange={(e) => { onGelirChange(e); }} value={gelirMiktar} placeholder="Miktar Giriniz" class="block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200" required />
                                        <label for="" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Gelir Tarihi</label>
                                        <input name="gelirTarih" onChange={(e) => { onGelirChange(e); }} value={gelirTarih} type="date" placeholder="Gelir Tarihini Giriniz" class="border border-gray-300 p-2 my-2 rounded-md focus:outline-none focus:ring-2 ring-blue-200" />
                                        <label for="" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Hesaplar</label>
                                        <select required name="gelirHesap" onChange={(e) => { onGelirChange(e); }} value={gelirHesap} class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded">
                                            <option value="" selected>Hesabı Seçin</option>
                                            {hesapLoading
                                                ? <Spinner />
                                                : allHesap.map(hesap => (
                                                    <option key={hesap._id} value={hesap._id}>{hesap.hesapAdi}</option>
                                                ))
                                            }

                                        </select>

                                        <button onClick={() => console.log(gelirFormData)} type="button" class="w-full py-3 mt-10 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none">Vazgeç</button>
                                        <button type="submit" class="w-full py-3 mt-5 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none">Kaydet</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Content>
                <Content active={tab === 2}>
                    <div className="text-black-100 dark:text-gray-50">
                        <div class="flex flex-col bg-gray-100">
                            <div class="grid place-items-center mx-2 my-20">
                                <div class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg">
                                    <h2 class="text-center font-semibold text-3xl lg:text-4xl text-gray-800">Gider Ekle</h2>
                                    <form class="mt-10" onSubmit={(e) => onGiderSubmit(e)}>
                                        <label for="" class="block text-xs font-semibold text-gray-600 uppercase">Gider Başlığı</label>
                                        <input name="giderBaslik" onChange={(e) => onGiderChange(e)} value={giderBaslik} placeholder="Gider Başlığı Giriniz" class="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200" required />
                                        <label for="" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Miktar</label>
                                        <input name="giderMiktar" onChange={(e) => onGiderChange(e)} value={giderMiktar} placeholder="Miktar Giriniz" class="block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200" required />
                                        <label for="" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Gider Tarihi</label>
                                        <input name="giderTarih" onChange={(e) => onGiderChange(e)} value={giderTarih} type="date" placeholder="Gider Tarihini Giriniz" class="border border-gray-300 p-2 my-2 rounded-md focus:outline-none focus:ring-2 ring-blue-200" />
                                        <label for="" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Kategoriler</label>
                                        <select name="giderKategori" onChange={(e) => { onGiderChange(e); }} value={giderKategori} class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" id="grid-state">
                                            <option value="" selected>Kategori Seçiniz</option>
                                            {kategoriLoading
                                                ? <Spinner />
                                                : allKategori.map(kategori => (
                                                    <option key={kategori._id} value={kategori._id}>{kategori.kategoriAdi}</option>
                                                ))
                                            }
                                        </select>
                                        <label for="" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Hesaplar</label>
                                        <select name="giderHesap" onChange={(e) => onGiderChange(e)} value={giderHesap} class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" id="grid-state">
                                            <option value="" selected>Hesap Seçiniz</option>
                                            {hesapLoading
                                                ? <Spinner />
                                                : allHesap.map(hesap => (
                                                    <option key={hesap._id} value={hesap._id}>{hesap.hesapAdi}</option>
                                                ))}
                                        </select>
                                        <button onClick={() => { console.log(giderFormData); console.log(giderHesap) }} type="button" class="w-full py-3 mt-10 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none">Vazgeç</button>
                                        <button type="submit" class="w-full py-3 mt-5 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none">Kaydet</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Content>
                <Content active={tab === 3}>
                    <div class="flex flex-col mt-8">
                        <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                            <div
                                class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                                <table class="min-w-full">
                                    <thead>
                                        <tr>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Gelir Başlığı</th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Gelir Miktarı</th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Gelir Tarihi</th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Hesap Adı</th>
                                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                                        </tr>
                                    </thead>

                                    <tbody class="bg-white">
                                        {gelirLoading
                                            ? <Spinner />
                                            : allGelir.map((gelir) => (
                                                <tr key={gelir.id}>
                                                    <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                                                        <div class="flex items-center">
                                                            <div class="ml-4">
                                                                <div class="text-sm leading-5 font-medium text-gray-900">{gelir.baslik}</div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                        <div class="text-sm leading-5 text-gray-900">{gelir.miktar}</div>
                                                    </td>

                                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                        <div class="text-sm leading-5 text-gray-500">{formatDate(gelir.tarih)}</div>
                                                    </td>

                                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                        <div class="text-sm leading-5 text-gray-500">{gelir.hesap.hesapAdi}</div>
                                                    </td>

                                                    <td
                                                        class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                                        <button onClick={() => { dispatch(deleteGelir({ id: gelir._id })) }} class="text-indigo-600 hover:text-indigo-900">Delete</button>
                                                    </td>
                                                </tr>
                                            ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Content>
                <Content active={tab === 4}>
                    <div class="flex flex-col mt-8">
                        <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                            <div
                                class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                                <table class="min-w-full">
                                    <thead>
                                        <tr>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                GİDER BAŞLIĞI</th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                GİDER Miktarı</th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                GİDER Tarihi</th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                KATEGORİ</th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Hesap Adı</th>
                                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                                        </tr>
                                    </thead>

                                    <tbody class="bg-white">
                                        {giderLoading
                                            ? <Spinner />
                                            : allGider.map((gider) => (
                                                <tr>
                                                    <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                                                        <div class="flex items-center">
                                                            <div class="ml-4">
                                                                <div class="text-sm leading-5 font-medium text-gray-900">{gider.baslik}</div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                        <div class="text-sm leading-5 text-gray-900">{gider.miktar}</div>
                                                    </td>

                                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                        <div class="text-sm leading-5 text-gray-500">{formatDate(gider.tarih)}</div>
                                                    </td>

                                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                        <div class="text-sm leading-5 text-gray-500">{gider.kategori.kategoriAdi}</div>
                                                    </td>

                                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                        <div class="text-sm leading-5 text-gray-500">{gider.hesap.hesapAdi}</div>
                                                    </td>

                                                    <td
                                                        class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                                        <button onClick={() => { dispatch(deleteGider({ id: gider._id })) }} class="text-indigo-600 hover:text-indigo-900">Delete</button>
                                                    </td>
                                                </tr>
                                            ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Content>
                <Content active={tab === 5}>
                    <div>
                        <div class="grid grid-cols-12 gap-4">
                            <div class="col-span-11">
                                <p class="text-gray-700 text-3xl font-medium">Kategoriler</p>
                            </div>
                            <div class="text-right">
                                <button onClick={() => { setKategoriModal(true) }}>
                                    <svg class="h-6 w-6 text-right" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>


                            </div>
                        </div>

                        <div class="flex flex-col mt-8">
                            <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                                <div
                                    class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                                    <table class="min-w-full">
                                        <thead>
                                            <tr>
                                                <th
                                                    class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                    Kategori Adı</th>
                                                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                                            </tr>
                                        </thead>

                                        <tbody class="bg-white">
                                            {kategoriLoading
                                                ? <Spinner />
                                                : allKategori.map(kategori => (
                                                    <tr>
                                                        <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                                                            <div class="flex items-center">
                                                                <div class="ml-4">
                                                                    <div class="text-sm leading-5 font-medium text-gray-900">{kategori.kategoriAdi}</div>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td
                                                            class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                                            <Link to="#" class="text-indigo-600 hover:text-indigo-900">Delete</Link>
                                                        </td>
                                                    </tr>
                                                ))}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div >
                </Content>
            </div>
            <Transition appear show={kategoriModal} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={() => setKategoriModal(false)}
                >
                    <div className="min-h-screen text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
            </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <form onSubmit={(e) => onKategoriSubmit(e)}>
                                <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                    <Dialog.Title
                                        as="div"
                                        className="flex flex-row justify-between p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg"
                                    >
                                        <p class="font-semibold text-gray-800">Kategori Ekle</p>
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <div class="flex flex-col py-5 bg-gray-50">
                                            <p class="mb-2 font-semibold text-gray-700">Kategori Adı</p>
                                            <input name="kategoriAdi" onChange={(e) => onKategoriChange(e)} value={kategoriAdi} placeholder="Kategori Adı Giriniz" class="block w-full p-5 bg-white border border-gray-200 rounded shadow-sm appearance-none" required />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                            onClick={() => setKategoriModal(false)}
                                        >
                                            Vazgeç
                                    </button>
                                        <button
                                            type="submit"
                                            className="ml-5 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                            onClick={() => setKategoriModal(false)}
                                        >
                                            Kaydet
                                    </button>
                                    </div>
                                </div>
                            </form>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default GelirGider
