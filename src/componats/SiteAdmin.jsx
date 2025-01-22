import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './siteAdmin.css';

// Import the city data (make sure the path is correct)
import citiesData from '../cities.json';

function TouristSitePage() {
    const [sites, setSites] = useState([]);
    const [siteId, setSiteId] = useState(null);  // Track if updating an existing site
    const [siteName, setSiteName] = useState('');
    const [siteDescription, setSiteDescription] = useState('');
    const [siteLocation, setSiteLocation] = useState('');
    const [siteCategory, setSiteCategory] = useState('');
    const [siteImage, setSiteImage] = useState(null);
    const [cities, setCities] = useState(citiesData); // Load city data from JSON

    useEffect(() => {
        fetchTouristSites();
    }, []);

    const fetchTouristSites = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/tourist-sites');
            setSites(response.data);
        } catch (error) {
            console.error('Error fetching tourist sites:', error);
        }
    };

    const handleAddOrUpdateSite = async (event) => {
        event.preventDefault();
        if (!siteName || !siteDescription || !siteLocation || !siteCategory) {
            console.error("All fields must be filled out.");
            return;
        }
    
        const formData = new FormData();
        formData.append('name', siteName);
        formData.append('description', siteDescription);
        formData.append('location', siteLocation);
        formData.append('category', siteCategory);
        if (siteImage) {
            formData.append('image', siteImage);
        }
        
    
        try {
            if (siteId) {
                // Use PUT for updating an existing site
                await axios.put(`http://localhost:8000/api/tourist-sites/${siteId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setSiteId(null); // Reset after update
            } else {
                // Use POST for adding a new site
                const response = await axios.post('http://localhost:8000/api/tourist-sites', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setSites([...sites, response.data]);
            }
            
            // Reset the form
            setSiteName('');
            setSiteDescription('');
            setSiteLocation('');
            setSiteCategory('');
            setSiteImage(null);
    
            fetchTouristSites();  // Refresh list after add/update
        } catch (error) {
            console.error('Error adding or updating tourist site:', error);
        }
    };

    const handleView = (site) => {
        setSiteId(site.id); // Set the ID for the site to update
        setSiteName(site.name);
        setSiteDescription(site.description);
        setSiteLocation(site.location);
        setSiteCategory(site.category);
        // Note: Skipping setting `siteImage` since we may not have a file object for existing images.
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/tourist-sites/${id}`);
            fetchTouristSites();
        } catch (error) {
            console.error('Error deleting tourist site:', error);
        }
    };

    return (
        <div className="container mt-5">

            <form onSubmit={handleAddOrUpdateSite} className="mb-4">
                <h2 className="mb-3">{siteId ? 'Edit' : 'Add'} Tourist Site</h2>
                <div className="mb-3">
                    <input
                        type="text"
                        value={siteName}
                        onChange={(e) => setSiteName(e.target.value)}
                        placeholder="Site Name"
                        required
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        value={siteDescription}
                        onChange={(e) => setSiteDescription(e.target.value)}
                        placeholder="Description"
                        required
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <select
                        value={siteLocation}
                        onChange={(e) => setSiteLocation(e.target.value)}
                        required
                        className="form-control"
                    >
                        <option value="">Select a city</option>
                        {cities.map((city) => (
                            <option key={city.id} value={city.city}>{city.city}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <select
                        value={siteCategory}
                        onChange={(e) => setSiteCategory(e.target.value)}
                        required
                        className="form-control"
                    >
                        <option value="">Select a category</option>
                        <option value="sport">Sport</option>
                        <option value="plage">Plage</option>
                        <option value="monument">Monument</option>
                        <option value="mall">Mall</option>
                    </select>
                </div>
                <div className="mb-3">
                    <input
                        type="file"
                        onChange={(e) => setSiteImage(e.target.files[0])}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">{siteId ? 'Update' : 'Add'} Site</button>
            </form>

            <h2 className="mt-5">List of Tourist Sites</h2>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Location</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sites.map(site => (
                            <tr key={site.id}>
                                <td>{site.name}</td>
                                <td>{site.description}</td>
                                <td>{site.location}</td>
                                <td>{site.category}</td>
                                <td>
                                    <button
                                        onClick={() => handleView(site)}
                                        className="btn btn-info btn-sm me-2"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => handleDelete(site.id)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TouristSitePage;
