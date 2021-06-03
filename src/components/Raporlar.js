import React, { useEffect, useState } from 'react'
import { Tabs, Tab, Content } from "./Tabs";
import { useDispatch, useSelector } from 'react-redux';

import { getGider } from "../redux/actions/giderAction"

import { getGelir } from "../redux/actions/gelirAction"
import Spinner from "../Spinner"

import axios from "axios"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Pie,
    PieChart
} from "recharts";

function Raporlar() {
    const [tab, setTab] = useState(1);
    const changeTab = (index) => {
        setTab(index)
    }
    const allGider = useSelector(state => state.giderReducer.gider);

    const allGelir = useSelector(state => state.gelirReducer.gelir);
    const gelirLoading = useSelector(state => state.gelirReducer.loading);

    const giderLoading = useSelector(state => state.gelirReducer.loading);

    const [giderData, setGiderData] = useState([]);
    const [gelirData, setGelirData] = useState([]);
    const [toplamGider, setToplamGider] = useState(0);
    const [toplamGelir, setToplamGelir] = useState(0);
    const [kategoriData, setKategoriData] = useState([]);
    const dispatch = useDispatch();
    const giderler = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
        "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ];

    useEffect(() => {
        dispatch(getGelir())
    }, [allGelir])

    useEffect(() => {
        dispatch(getGider())
    }, [allGider])

    useEffect(() => {
        async function fetchData() {
            if (gelirData.length === 0) {
                var kategoriGiderler = {}
                var toplamGider = 0
                var toplamGelir = 0
                const giderRes = await axios.get("http://localhost:5000/api/gider");
                giderRes.data.map(gider => {
                    let giderTarihi = new Date(gider.tarih)
                    giderler[giderTarihi.getMonth()] += gider.miktar
                    toplamGider += gider.miktar
                    return gider
                })

                const gelirRes = await axios.get("http://localhost:5000/api/gelir");
                gelirRes.data.map(gelir => {
                    toplamGelir += gelir.miktar
                    return gelir
                })

                const kategoriRes = await axios.get("http://localhost:5000/api/kategori");

                kategoriRes.data.map((kat, index) => {
                    giderRes.data.map(gider => {
                        if (kat.kategoriAdi === gider.kategori.kategoriAdi) {
                            if (!kategoriGiderler[kat.kategoriAdi]) {
                                kategoriGiderler[kat.kategoriAdi] = gider.miktar
                            } else {
                                kategoriGiderler[kat.kategoriAdi] += gider.miktar
                            }
                        }
                        return gider
                    })
                    return kat;
                })
                giderler.map((gider, index) => {
                    setGiderData(oldArray => [...oldArray, { "name": monthNames[index], "gider": gider }]);
                    return gider
                })
                for (const key in kategoriGiderler) {
                    setKategoriData(oldArray => [...oldArray, { "name": key, "gider": kategoriGiderler[key] }]);
                }
                setToplamGider(toplamGider);
                setToplamGelir(toplamGelir);
                setGelirData(gelirRes.data);
            }
        }
        fetchData();

    }, [gelirData])

    function getAylikGiderChart() {
        return (
            <BarChart
                width={900}
                height={300}
                data={giderData}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="gider" stackId="a" fill="#8884d8" />
            </BarChart>
        )
    }


    function getKategoriChart() {
        return (
            <BarChart
                width={900}
                height={300}
                data={kategoriData}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="gider" stackId="a" fill="#8884d8" />
            </BarChart>
        )
    }

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




    return (
        <div>



            <Tabs>
                <Tab onClick={() => changeTab(1)} active={tab === 1}>
                    Aylık Toplam Harcamalar
                </Tab>
                <Tab onClick={() => changeTab(2)} active={tab === 2}>
                    Kategoriye Göre Harcamalar
                </Tab>
                <Tab onClick={() => changeTab(3)} active={tab === 3}>
                    Harcamalar ve Hesaplar
                </Tab>
            </Tabs>
            <div class="my-8">
                <Content active={tab === 1}>
                    <div class="flex flex-col mt-8">
                        <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                            <div
                                class="flex align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                                <div>
                                    <h1 className="font-semibold text-3xl">Aylara Göre Harcamalar</h1>
                                    {getAylikGiderChart()}
                                </div>
                                <div>
                                    <PieChart width={600} height={250}>
                                        <Pie data={giderData} dataKey="gider" nameKey="name" outerRadius={100} fill="#8884d8" />
                                        <Tooltip />
                                    </PieChart>
                                </div>
                            </div>
                        </div>
                    </div>
                </Content>
                <Content active={tab === 2}>
                    <div class="flex flex-col mt-8">
                        <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                            <div
                                class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                                {getKategoriChart()}
                            </div>
                        </div>
                    </div>
                </Content>
                <Content active={tab === 3}>
                    <div class="flex flex-col mt-8">
                        <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">



                            <div class="my-8">
                                <div class="flex flex-wrap -mx-6">
                                    <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
                                        <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                                            <div class="p-3 rounded-full bg-green-600 bg-opacity-75">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>

                                            <div class="mx-5">
                                                <h4 class="text-2xl font-semibold text-gray-700">{toplamGelir} TL</h4>
                                                <div class="text-gray-500">Toplam Gelir</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
                                        <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                                            <div class="p-3 rounded-full bg-red-600 bg-opacity-75">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>

                                            <div class="mx-5">
                                                <h4 class="text-2xl font-semibold text-gray-700">{toplamGider} TL</h4>
                                                <div class="text-gray-500">Toplam Gider</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                                        <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                                            <div class="p-3 rounded-full bg-yellow-600 bg-opacity-75">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                                </svg>
                                            </div>

                                            <div class="mx-5">
                                                <h4 class="text-2xl font-semibold text-gray-700">{toplamGelir - toplamGider} TL</h4>
                                                <div class="text-gray-500">Varlıklarım</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div
                                class="mb-8 align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                                <h1 className="text-3xl font-semibold mb-2">Gelirler</h1>
                                <table class="min-w-full mb-8">
                                    <thead>
                                        <tr>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Başlık</th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Miktar</th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Tarih</th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Hesap</th>
                                        </tr>
                                    </thead>

                                    <tbody class="bg-white">
                                        {gelirLoading
                                            ? <Spinner />
                                            : allGelir.map((gelir, index) => (
                                                <tr key={index}>
                                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
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
                                                        <div class="text-sm leading-5 text-gray-900">{formatDate(gelir.tarih)}</div>
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                        <div class="text-sm leading-5 text-gray-900">{gelir.hesap.hesapAdi}</div>
                                                    </td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                            </div>

                            <div
                                class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                                <h1 className="text-3xl font-semibold mb-2">Giderler</h1>
                                <table class="min-w-full mb-8">
                                    <thead>
                                        <tr>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Başlık</th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Miktar</th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Tarih</th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Hesap</th>
                                            <th
                                                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Kategori</th>
                                        </tr>
                                    </thead>

                                    <tbody class="bg-white">
                                        {giderLoading
                                            ? <Spinner />
                                            : allGider.map((gider, index) => (
                                                <tr key={index}>
                                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
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
                                                        <div class="text-sm leading-5 text-gray-900">{formatDate(gider.tarih)}</div>
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                        <div class="text-sm leading-5 text-gray-900">{gider.hesap.hesapAdi}</div>
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                        <div class="text-sm leading-5 text-gray-900">{gider.kategori.kategoriAdi}</div>
                                                    </td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Content>

            </div>

        </div>
    )
}

export default Raporlar
