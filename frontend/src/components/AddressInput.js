import React, { useState } from 'react';

const AddressInput = ({ onSelectAddress }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const fetchSuggestions = async (input) => {
        if (!input) {
            setSuggestions([]);
            return;
        }
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}`
            );
            const data = await response.json();
            setSuggestions(data);
        } catch (error) {
            console.error('Error fetching address suggestions:', error);
        }
    };

    const handleInputChange = (e) => {
        const input = e.target.value;
        setQuery(input);
        fetchSuggestions(input);
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion.display_name);
        setSuggestions([]);
        onSelectAddress(suggestion);
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Enter address"
            />
            {suggestions.length > 0 && (
                <ul>
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion.place_id}
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion.display_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AddressInput;
