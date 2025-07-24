import { useState, createContext, useContext } from 'react'

const AddressContext = createContext();

export const AddressProvider = ({ children } ) => {
	const [address, setAddress] = useState({});

	const handleAddressChange = (newAddress) => {
		setAddress(newAddress)
	}

	return (
		<AddressContext.Provider value={{address, handleAddressChange}}>
			{ children }
		</AddressContext.Provider>
	)
}

export default function useAddress() {
	return useContext(AddressContext);
}