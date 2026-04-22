// @desc    Mock AI Skin Analysis Service
// @param   imageUrl   URL of the uploaded selfie
const analyzeSkin = async (imageUrl) => {
    // Simulate API processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock logic: randomly assign attributes for demo purposes
    // In a real app, this would call a 3rd party AI API
    const skinTypes = ['Oily', 'Dry', 'Combination', 'Normal'];
    const shades = ['Fair', 'Light', 'Medium', 'Tan', 'Deep'];
    const undertones = ['Warm', 'Cool', 'Neutral'];

    // Use true math randomization so every selfie gets a unique AI "analysis"
    return {
        skinType: skinTypes[Math.floor(Math.random() * skinTypes.length)],
        shade: shades[Math.floor(Math.random() * shades.length)],
        undertone: undertones[Math.floor(Math.random() * undertones.length)],
        concerns: ['Dark Circles', 'Uneven Tone'], // Mock concerns
        confidence: 0.95
    };
};

module.exports = { analyzeSkin };
