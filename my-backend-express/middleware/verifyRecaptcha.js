

const verifyRecaptcha = async (req, res, next) => {
    const { recaptchaToken } = req.body;

    if (!recaptchaToken) {
        return res.status(400).json({ error: 'Token reCAPTCHA missing' });
    }

    try {
        const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',            
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            
            body: new URLSearchParams({
                secret: process.env.RECAPTCHA_SECRET_KEY, 
                response: recaptchaToken, 
            }),
        });
        const data = await response.json();
        if (!data.success) {
            return res.status(400).json({
                error: 'Échec de la vérification reCAPTCHA',
                errorCodes: data['error-codes'] || ['unknown'], 
            });
        }
        next();
    } catch (error) {
        console.error('Erreur reCAPTCHA:', error);
        return res.status(500).json({ error: 'Error reCAPTCHA', details: error.message });
    }
};

module.exports = verifyRecaptcha;