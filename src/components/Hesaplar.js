import React, { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux';
import { getHesap, setHesap, deleteHesap } from "../redux/actions/hesapAction"
import Spinner from "../Spinner"
function Hesaplar() {
    const [hesapModal, setHesapModal] = useState(false);
    const allHesap = useSelector(state => state.hesapReducer.hesap);
    const loading = useSelector(state => state.hesapReducer.loading);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        hesapAdi: "",
        hesapMiktari: "",
        hesapTuru: ""
    })

    const { hesapAdi, hesapMiktari, hesapTuru } = formData;

    useEffect(() => {
        dispatch(getHesap());
    }, [allHesap])

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(setHesap({ hesapAdi, hesapMiktari, hesapTuru }));
        setHesapModal(false);
    }

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <div class="grid grid-cols-12 gap-4">
                <div class="col-span-11">
                    <h3 class="text-gray-700 text-3xl font-medium">Hesaplar</h3>
                </div>
                <div class="text-right">
                    <button onClick={() => { setHesapModal(true) }}>
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
                                        Hesap Adı</th>
                                    <th
                                        class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Hesap Türü</th>
                                    <th
                                        class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Hesap Miktarı</th>
                                    <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                                </tr>
                            </thead>

                            <tbody class="bg-white">
                                {loading
                                    ? <Spinner />
                                    : allHesap.map((hesap) => (
                                        <tr key={hesap._id}>
                                            <td class="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div class="flex items-center">
                                                    <div class="ml-4">
                                                        <div class="text-sm leading-5 font-medium text-gray-900">{hesap.hesapAdi}</div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div class="text-sm leading-5 text-gray-900">{hesap.hesapTuru}</div>
                                            </td>

                                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div class="text-sm leading-5 text-gray-500">{hesap.hesapMiktari}</div>
                                            </td>

                                            <td
                                                class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                                <button onClick={() => { dispatch(deleteHesap({ id: hesap._id })) }} class="text-indigo-600 hover:text-indigo-900">Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Transition appear show={hesapModal} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={() => setHesapModal(false)}
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
                            <form onSubmit={(e) => onSubmit(e)}>
                                <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                    <Dialog.Title
                                        as="div"
                                        className="flex flex-row justify-between p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg"
                                    >
                                        <p class="font-semibold text-gray-800">Hesap Ekle</p>
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <div class="flex flex-col py-5 bg-gray-50">
                                            <p class="mb-2 font-semibold text-gray-700">Hesap Adı</p>
                                            <input name="hesapAdi" onChange={(e) => onChange(e)} value={formData.hesapAdi} placeholder="Hesap Adı Giriniz" class="block w-full p-5 bg-white border border-gray-200 rounded shadow-sm appearance-none" required />
                                        </div>
                                    </div>

                                    <div class="flex flex-col sm:flex-row items-center mb-5 sm:space-x-5">
                                        <div class="w-full sm:w-1/2">
                                            <p class="mb-2 font-semibold text-gray-700">Hesap Türü</p>
                                            <select
                                                name="hesapTuru"
                                                type="text"
                                                onChange={(e) => onChange(e)}
                                                value={formData.hesapTuru}
                                                class="w-full p-5 bg-white border border-gray-200 rounded shadow-sm appearance-none"
                                                required
                                            >
                                                <option value="" selected>Hesap Türü Seçiniz</option>
                                                <option value="TRY">TRY</option>
                                                <option value="Euro">Euro</option>
                                                <option value="Dollar">Dollar</option>
                                            </select>
                                        </div>
                                        <div class="w-full sm:w-1/2 mt-2 sm:mt-0">
                                            <p class="mb-2 font-semibold text-gray-700">Hesap Miktarı</p>
                                            <input name="hesapMiktari" onChange={(e) => onChange(e)} value={formData.hesapMiktari} placeholder="Hesap Miktarı Giriniz" class="block w-full p-5 bg-white border border-gray-200 rounded shadow-sm appearance-none" required />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                            onClick={() => { setHesapModal(false); console.log(formData) }}
                                        >
                                            Vazgeç
                                    </button>
                                        <button
                                            type="submit"
                                            className="ml-5 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
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
        </div >
    )
}

export default Hesaplar
