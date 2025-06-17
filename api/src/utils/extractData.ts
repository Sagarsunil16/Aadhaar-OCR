const extractData = async (text: string) => {
    const data: any = {};
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Aadhaar Number (12-digit)
        if (/^\d{4}\s?\d{4}\s?\d{4}$/.test(line)) {
            data.aadhaarNumber = line.replace(/\s/g, '');
        }

        // Virtual ID (16-digit)
        else if (/VID[:\s]*\d{4}\s?\d{4}\s?\d{4}\s?\d{4}/i.test(line)) {
            const match = line.match(/\d+/g);
            if (match) data.vid = match.join('');
        }

        // DOB (Date of Birth)
        else if (/dob|जन्म/i.test(line.toLowerCase())) {
            const dobMatch = line.match(/(\d{2}[-\/]\d{2}[-\/]\d{4})/);
            if (dobMatch) data.dob = dobMatch[1];

            // Try to infer name from the line above
             const possibleName = lines[i - 1];
            if (possibleName) {
                const cleanedName = possibleName.replace(/[^a-zA-Z\s]/g, '').trim();
                if (/^[A-Z][a-z]+(\s+[A-Z][a-z]+)+$/.test(cleanedName)) {
                    data.name = cleanedName;
                }
            }
        }

        // Gender
        else if (/male|female|पुरुष|महिला/i.test(line)) {
            const genderMatch = line.match(/male|female/i);
            if (genderMatch) data.gender = genderMatch[0].toUpperCase();
        }

        // Address extraction – check for "Address" or "S/O", "D/O"
        else if (/address|s\/o|d\/o/i.test(line.toLowerCase())) {
            let addressLines = [line];
            // Collect next few lines if they look like address parts
            for (let j = 1; j <= 3; j++) {
                const nextLine = lines[i + j];
                if (nextLine && !/^\d{4}/.test(nextLine)) {
                    addressLines.push(nextLine);
                }
            }
            data.address = addressLines.join(', ').replace(/\s+/g, ' ').trim();
        }
    }

    return data;
};

export default extractData;
