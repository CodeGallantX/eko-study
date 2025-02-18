import { FaMagnifyingGlass } from "react-icons/fa6"

export default function SearchBar () {
    return (
        <fieldset className="flex flex-row items-center justify-center mx-4">
            <input type="search" name="search" className="w-full max-w-xl border-2 border-gray-400 p-3 outline-none" />
            <button type="submit" className="bg-deepGreen text-white p-2 text-lg -translate-x-4"><FaMagnifyingGlass /></button>
        </fieldset>
    )
}