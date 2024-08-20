export default function handler(req, res) {
    res.status(200).json({
        "user": {
            "first_name": "Joe",
            "last_name": "Thomas",
            "email": "schoolemailredirect@joesieve.co.uk",
            "about_me": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt malesuada lorem, a venenatis arcu euismod eget. Maecenas ultrices pretium mollis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; orci.",
            "employment_type_preferences": ["software_internships"],
            "subscription_level": "plus"
        },
        "original_endpoint": "https://inversity-api.azurewebsites.net/user",
        "ive_removed_extra_data": 1
    })
}