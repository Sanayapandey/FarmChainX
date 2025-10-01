import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AIAnalyzerModal = ({ isOpen, onClose }) => {
  const [selectedFruit, setSelectedFruit] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);

  const fruitDatabase = {
    apple: {
      icon: '🍎',
      name: 'Apple',
      varieties: ['Red Delicious', 'Granny Smith', 'Gala', 'Fuji', 'Honeycrisp', 'Golden Delicious'],
      description: 'Crisp texture, various colors',
      avgShelfLife: 30,
      optimalTemp: '0-4°C',
      optimalHumidity: '90-95%',
      peakRipeness: 85,
      qualityFactors: {
        firmness: 0.3,
        color: 0.25,
        skin: 0.25,
        shape: 0.2,
      },
      priceRange: { premium: 150, standard: 100, discount: 60 },
    },
    banana: {
      icon: '🍌',
      name: 'Banana',
      varieties: ['Cavendish', 'Lady Finger', 'Red Banana', 'Plantain'],
      description: 'Curved yellow fruit',
      avgShelfLife: 7,
      optimalTemp: '13-15°C',
      optimalHumidity: '85-90%',
      peakRipeness: 75,
      qualityFactors: {
        color: 0.4,
        spots: 0.3,
        firmness: 0.2,
        shape: 0.1,
      },
      priceRange: { premium: 80, standard: 50, discount: 30 },
    },
    orange: {
      icon: '🍊',
      name: 'Orange',
      varieties: ['Navel', 'Valencia', 'Blood Orange', 'Mandarin'],
      description: 'Citrus with thick skin',
      avgShelfLife: 21,
      optimalTemp: '0-4°C',
      optimalHumidity: '85-90%',
      peakRipeness: 90,
      qualityFactors: {
        color: 0.3,
        firmness: 0.3,
        skin: 0.25,
        weight: 0.15,
      },
      priceRange: { premium: 120, standard: 80, discount: 45 },
    },
    strawberry: {
      icon: '🍓',
      name: 'Strawberry',
      varieties: ['Albion', 'Seascape', 'Chandler', 'Festival'],
      description: 'Small red berries',
      avgShelfLife: 5,
      optimalTemp: '0-2°C',
      optimalHumidity: '90-95%',
      peakRipeness: 95,
      qualityFactors: {
        color: 0.35,
        firmness: 0.35,
        surface: 0.2,
        size: 0.1,
      },
      priceRange: { premium: 300, standard: 200, discount: 120 },
    },
    grape: {
      icon: '🍇',
      name: 'Grape',
      varieties: ['Red Globe', 'Thompson Seedless', 'Flame Seedless', 'Black Beauty'],
      description: 'Clustered small fruits',
      avgShelfLife: 14,
      optimalTemp: '-1-0°C',
      optimalHumidity: '90-95%',
      peakRipeness: 88,
      qualityFactors: {
        firmness: 0.3,
        color: 0.25,
        cluster: 0.25,
        bloom: 0.2,
      },
      priceRange: { premium: 250, standard: 150, discount: 90 },
    },
    mango: {
      icon: '🥭',
      name: 'Mango',
      varieties: ['Alphonso', 'Tommy Atkins', 'Kent', 'Haden'],
      description: 'Tropical stone fruit',
      avgShelfLife: 10,
      optimalTemp: '10-13°C',
      optimalHumidity: '85-90%',
      peakRipeness: 80,
      qualityFactors: {
        color: 0.3,
        firmness: 0.3,
        aroma: 0.25,
        skin: 0.15,
      },
      priceRange: { premium: 200, standard: 120, discount: 70 },
    },
  };

  const selectFruit = (fruitKey) => {
    setSelectedFruit(fruitKey);
    setSelectedCondition(null);
    setAnalysisResults(null);
    setTimeout(() => {
      const conditionSelector = document.getElementById('conditionSelector');
      if (conditionSelector) {
        conditionSelector.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const selectCondition = (condition) => {
    setSelectedCondition(condition);
    if (selectedFruit && condition) {
      setTimeout(() => {
        const proceedButton = document.getElementById('proceedToUpload');
        if (proceedButton) {
          proceedButton.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    }
  };

  const proceedToStep2 = () => {
    if (!selectedFruit || !selectedCondition) {
      alert('Please select both a fruit and its condition before proceeding.');
      return;
    }
    setCurrentStep(2);
    setTimeout(() => {
      const uploadSection = document.getElementById('imageUploadSection');
      if (uploadSection) {
        uploadSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="container"
            onClick={(e) => e.stopPropagation()}
          >
            <style>
              {`
                * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                }
                .container {
                  max-width: 1440px;
                  margin: 0 auto;
                  background: rgba(255, 255, 255, 0.95);
                  border-radius: 24px;
                  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.1);
                  overflow: hidden;
                  transition: transform 0.3s ease;
                }
                .header {
                  background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%);
                  color: white;
                  padding: 48px 24px;
                  text-align: center;
                  position: relative;
                  overflow: hidden;
                }
                .header::before {
                  content: '';
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
                  opacity: 0.5;
                  z-index: 0;
                }
                .header h1 {
                  font-size: 2.5rem;
                  font-weight: 700;
                  margin-bottom: 12px;
                  position: relative;
                  z-index: 1;
                  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .header p {
                  font-size: 1.1rem;
                  font-weight: 400;
                  opacity: 0.9;
                  position: relative;
                  z-index: 1;
                }
                .main-content {
                  padding: 32px;
                }
                .step-indicator {
                  display: flex;
                  justify-content: center;
                  gap: 16px;
                  margin-bottom: 32px;
                  flex-wrap: wrap;
                }
                .step {
                  display: flex;
                  align-items: center;
                  gap: 12px;
                  padding: 12px 24px;
                  background: #f1f3f5;
                  border-radius: 50px;
                  font-size: 0.9rem;
                  font-weight: 500;
                  transition: all 0.3s ease;
                  cursor: default;
                }
                .step.active {
                  background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%);
                  color: white;
                  transform: scale(1.05);
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }
                .step.completed {
                  background: #e6f4ea;
                  color: #2e7d32;
                }
                .step-number {
                  background: white;
                  color: #333;
                  width: 28px;
                  height: 28px;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-weight: 600;
                  font-size: 0.9rem;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .step.active .step-number {
                  background: #fff3e0;
                  color: #d81b60;
                }
                .content-section {
                  background: #ffffff;
                  border-radius: 16px;
                  padding: 32px;
                  margin-bottom: 24px;
                  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
                }
                .fruit-selection {
                  text-align: center;
                }
                .fruit-selection h2,
                .condition-selector h3 {
                  font-size: 1.75rem;
                  font-weight: 600;
                  color: #1a3c34;
                  margin-bottom: 12px;
                }
                .fruit-selection p,
                .condition-selector p {
                  color: #4b5e5a;
                  font-size: 1rem;
                  margin-bottom: 24px;
                }
                .fruit-grid {
                  display: grid;
                  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                  gap: 16px;
                  max-width: 960px;
                  margin: 24px auto;
                }
                .fruit-option {
                  background: white;
                  border: 2px solid transparent;
                  border-radius: 16px;
                  padding: 24px 16px;
                  cursor: pointer;
                  transition: all 0.3s ease;
                  position: relative;
                  overflow: hidden;
                }
                .fruit-option::before {
                  content: '';
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background: linear-gradient(135deg, #ff6b6b, #ff8e53);
                  opacity: 0;
                  transition: opacity 0.3s ease;
                }
                .fruit-option:hover {
                  transform: translateY(-4px);
                  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
                }
                .fruit-option:hover::before {
                  opacity: 0.1;
                }
                .fruit-option.selected {
                  border-color: #ff6b6b;
                  background: linear-gradient(135deg, #fff3e0 0%, #ffebee 100%);
                  transform: translateY(-2px);
                  box-shadow: 0 8px 24px rgba(255, 107, 107, 0.3);
                }
                .fruit-icon {
                  font-size: 2.5rem;
                  margin-bottom: 12px;
                  display: block;
                  transition: transform 0.3s ease;
                }
                .fruit-option:hover .fruit-icon {
                  transform: scale(1.1);
                }
                .fruit-name {
                  font-weight: 600;
                  color: #1a3c34;
                  font-size: 1.1rem;
                }
                .fruit-desc {
                  font-size: 0.85rem;
                  color: #6b7280;
                }
                .condition-selector {
                  margin: 32px 0;
                  padding: 24px;
                  background: white;
                  border-radius: 16px;
                  box-shadow: 0 8px 24px rgba(0,0,0,0.05);
                }
                .condition-options {
                  display: grid;
                  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                  gap: 16px;
                }
                .condition-card {
                  background: white;
                  border: 2px solid transparent;
                  border-radius: 16px;
                  padding: 20px 12px;
                  text-align: center;
                  cursor: pointer;
                  transition: all 0.3s ease;
                  position: relative;
                  overflow: hidden;
                }
                .condition-card::before {
                  content: '';
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background: linear-gradient(135deg, #ff6b6b, #34c0eb);
                  opacity: 0;
                  transition: opacity 0.3s ease;
                }
                .condition-card:hover {
                  transform: translateY(-4px);
                  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
                }
                .condition-card:hover::before {
                  opacity: 0.1;
                }
                .condition-card.selected {
                  transform: translateY(-2px);
                  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
                }
                .condition-card[data-condition="fresh"]:hover,
                .condition-card[data-condition="fresh"].selected {
                  border-color: #4caf50;
                  background: linear-gradient(135deg, #e6f4ea 0%, #f1f8e9 100%);
                }
                .condition-card[data-condition="aging"]:hover,
                .condition-card[data-condition="aging"].selected {
                  border-color: #ff8e53;
                  background: linear-gradient(135deg, #fff3e0 0%, #ffefdb 100%);
                }
                .condition-card[data-condition="stale"]:hover,
                .condition-card[data-condition="stale"].selected {
                  border-color: #ffca28;
                  background: linear-gradient(135deg, #fffbe6 0%, #fff8e1 100%);
                }
                .condition-card[data-condition="rotten"]:hover,
                .condition-card[data-condition="rotten"].selected {
                  border-color: #d81b60;
                  background: linear-gradient(135deg, #fce4ec 0%, #f8e8ee 100%);
                }
                .condition-icon {
                  font-size: 2.25rem;
                  margin-bottom: 12px;
                  transition: transform 0.3s ease;
                }
                .condition-card:hover .condition-icon {
                  transform: scale(1.1);
                }
                .condition-card h4 {
                  color: #1a3c34;
                  font-size: 1.1rem;
                  font-weight: 600;
                  margin-bottom: 8px;
                }
                .condition-card p {
                  color: #6b7280;
                  font-size: 0.85rem;
                  line-height: 1.4;
                }
                .upload-btn {
                  background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%);
                  color: white;
                  border: none;
                  padding: 12px 24px;
                  border-radius: 50px;
                  font-size: 1rem;
                  font-weight: 600;
                  cursor: pointer;
                  transition: all 0.3s ease;
                  display: flex;
                  align-items: center;
                  gap: 8px;
                }
                .upload-btn:hover {
                  transform: translateY(-2px);
                  box-shadow: 0 8px 16px rgba(255, 107, 107, 0.3);
                  background: linear-gradient(135deg, #ff8e53 0%, #ff6b6b 100%);
                }
                .close-button {
                  position: absolute;
                  top: 16px;
                  right: 16px;
                  background: none;
                  border: none;
                  color: white;
                  font-size: 1.5rem;
                  cursor: pointer;
                }
                .hidden {
                  display: none;
                }
                @media (max-width: 768px) {
                  .main-content {
                    padding: 16px;
                  }
                  .header h1 {
                    font-size: 1.75rem;
                  }
                  .header p {
                    font-size: 0.95rem;
                  }
                  .fruit-grid {
                    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                  }
                  .condition-options {
                    grid-template-columns: 1fr;
                  }
                }
                @media (max-width: 480px) {
                  .step-indicator {
                    flex-direction: column;
                    align-items: center;
                  }
                  .step {
                    width: 100%;
                    max-width: 240px;
                    justify-content: center;
                  }
                  .fruit-selection h2,
                  .condition-selector h3 {
                    font-size: 1.5rem;
                  }
                }
              `}
            </style>
            <div className="header">
              <h1>🍎 AI Fruit Analyzer Pro</h1>
              <p>Advanced Agricultural Quality Assessment with AI Vision</p>
              <button className="close-button" onClick={onClose}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="main-content">
              <div className="step-indicator">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`step ${step === currentStep ? 'active' : step < currentStep ? 'completed' : ''}`}
                    id={`step${step}`}
                  >
                    <div className="step-number">{step}</div>
                    <span>{['Select Fruit', 'Upload Image', 'AI Analysis', 'Results'][step - 1]}</span>
                  </div>
                ))}
              </div>
              {currentStep === 1 && (
                <div id="fruitSelectionSection" className="content-section">
                  <div className="fruit-selection">
                    <h2>🎯 Choose Your Fruit</h2>
                    <p>Select the fruit type for precise quality analysis</p>
                    <div className="fruit-grid">
                      {Object.entries(fruitDatabase).map(([key, fruit]) => (
                        <motion.div
                          key={key}
                          whileHover={{ translateY: -4 }}
                          whileTap={{ translateY: 0 }}
                          className={`fruit-option ${selectedFruit === key ? 'selected' : ''}`}
                          data-fruit={key}
                          onClick={() => selectFruit(key)}
                        >
                          <span className="fruit-icon">{fruit.icon}</span>
                          <div className="fruit-name">{fruit.name}</div>
                          <div className="fruit-desc">{fruit.description}</div>
                        </motion.div>
                      ))}
                    </div>
                    <div id="conditionSelector" className={`condition-selector ${selectedFruit ? '' : 'hidden'}`}>
                      <h3>🔍 Select Fruit Condition</h3>
                      <p>Help us refine the analysis by specifying the fruit's condition</p>
                      <div className="condition-options">
                        {[
                          { condition: 'fresh', icon: '✨', title: 'Fresh & New', desc: 'Vibrant, recently harvested' },
                          { condition: 'aging', icon: '⚠️', title: 'Aging', desc: 'Slightly soft or discolored' },
                          { condition: 'stale', icon: '🚨', title: 'Stale/Overripe', desc: 'Soft, dark spots, wrinkled' },
                          { condition: 'rotten', icon: '💀', title: 'Rotten/Moldy', desc: 'Moldy or completely spoiled' },
                        ].map(({ condition, icon, title, desc }) => (
                          <motion.div
                            key={condition}
                            whileHover={{ translateY: -4 }}
                            whileTap={{ translateY: 0 }}
                            className={`condition-card ${selectedCondition === condition ? 'selected' : ''}`}
                            data-condition={condition}
                            onClick={() => selectCondition(condition)}
                          >
                            <div className="condition-icon">{icon}</div>
                            <h4>{title}</h4>
                            <p>{desc}</p>
                          </motion.div>
                        ))}
                      </div>
                      <motion.button
                        id="proceedToUpload"
                        whileHover={{ translateY: -2 }}
                        whileTap={{ translateY: 0 }}
                        onClick={proceedToStep2}
                        className={`upload-btn ${selectedFruit && selectedCondition ? '' : 'hidden'}`}
                      >
                        Next: Upload Image →
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}
              {/* Second half of the AIAnalyzerModal (image upload, analysis, and results) will be provided in the next response */}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// The ConsumerDashboard component and remaining code will be provided in a subsequent response if needed
```
```jsx
const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target.result);
      setTimeout(() => {
        const startButton = document.getElementById('startAnalysis');
        if (startButton) {
          startButton.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    };
    reader.readAsDataURL(file);
  } else {
    alert('Please select a valid image file.');
  }
};

const captureImage = () => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        alert('Camera access granted! In production, this would capture and process the image.');
        stream.getTracks().forEach((track) => track.stop());
      })
      .catch(() => {
        alert('Camera not available. Please use the gallery option.');
      });
  } else {
    alert('Camera functionality not supported.');
  }
};

const startAnalysis = () => {
  if (!uploadedImage || !selectedFruit || !selectedCondition) {
    alert('Please select a fruit, condition, and upload an image.');
    return;
  }
  setCurrentStep(3);
  const stages = [
    'Preprocessing image data...',
    'Extracting visual features...',
    'Analyzing color patterns...',
    'Detecting surface defects...',
    'Measuring firmness indicators...',
    'Calculating ripeness metrics...',
    'Estimating shelf life...',
    'Generating quality score...',
    'Compiling business insights...',
  ];
  let stageIndex = 0;
  const progressText = document.getElementById('progressText');
  const stageInterval = setInterval(() => {
    if (stageIndex < stages.length) {
      if (progressText) progressText.textContent = stages[stageIndex];
      stageIndex++;
    } else {
      clearInterval(stageInterval);
      setTimeout(() => {
        const analysis = generateRealisticAnalysis(fruitDatabase[selectedFruit]);
        setAnalysisResults(analysis);
        setCurrentStep(4);
        setTimeout(() => {
          const resultsSection = document.getElementById('resultsSection');
          if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }, 1000);
    }
  }, 800);
};

const generateRealisticAnalysis = (fruitData) => {
  let freshness, ripeness, shelfLife, confidence, qualityScore, qualityGrade, variety;
  switch (selectedCondition) {
    case 'fresh':
      freshness = Math.round(85 + Math.random() * 15);
      ripeness = Math.round(Math.max(70, Math.min(95, fruitData.peakRipeness + (Math.random() - 0.5) * 15)));
      shelfLife = Math.round(fruitData.avgShelfLife * (0.9 + Math.random() * 0.1));
      confidence = Math.round(88 + Math.random() * 12);
      break;
    case 'aging':
      freshness = Math.round(60 + Math.random() * 25);
      ripeness = Math.round(Math.max(80, Math.min(100, fruitData.peakRipeness + (Math.random() * 20))));
      shelfLife = Math.round(fruitData.avgShelfLife * (0.3 + Math.random() * 0.4));
      confidence = Math.round(82 + Math.random() * 10);
      break;
    case 'stale':
      freshness = Math.round(25 + Math.random() * 35);
      ripeness = Math.round(Math.max(90, Math.min(100, 95 + Math.random() * 5)));
      shelfLife = Math.round(fruitData.avgShelfLife * (0.1 + Math.random() * 0.2));
      confidence = Math.round(75 + Math.random() * 15);
      break;
    case 'rotten':
      freshness = Math.round(5 + Math.random() * 20);
      ripeness = 100;
      shelfLife = Math.round(0 + Math.random() * 2);
      confidence = Math.round(90 + Math.random() * 10);
      break;
    default:
      freshness = Math.round(60 + Math.random() * 25);
      ripeness = Math.round(fruitData.peakRipeness);
      shelfLife = Math.round(fruitData.avgShelfLife * 0.5);
      confidence = 85;
  }
  qualityScore = (freshness * 0.5) + (Math.min(ripeness, 90) * 0.3) + (confidence * 0.2);
  if (selectedCondition === 'rotten') qualityGrade = 'F';
  else if (selectedCondition === 'stale') qualityGrade = freshness > 50 ? 'D+' : 'D';
  else if (qualityScore >= 90) qualityGrade = 'A+';
  else if (qualityScore >= 85) qualityGrade = 'A';
  else if (qualityScore >= 80) qualityGrade = 'A-';
  else if (qualityScore >= 75) qualityGrade = 'B+';
  else if (qualityScore >= 70) qualityGrade = 'B';
  else if (qualityScore >= 60) qualityGrade = 'C';
  else qualityGrade = 'D';
  variety = fruitData.varieties[Math.floor(Math.random() * fruitData.varieties.length)];
  return { freshness, ripeness, shelfLife: Math.max(0, shelfLife), confidence, qualityGrade, qualityScore, fruitData, condition: selectedCondition, variety };
};

const getRating = (value) => {
  if (value >= 85) return { text: 'Excellent', class: 'excellent' };
  if (value >= 75) return { text: 'Good', class: 'good' };
  if (value >= 65) return { text: 'Average', class: 'average' };
  return { text: 'Poor', class: 'poor' };
};

const getShelfLifeRating = (days, avgDays) => {
  const ratio = days / avgDays;
  if (ratio >= 0.8) return { text: 'Extended', class: 'excellent' };
  if (ratio >= 0.6) return { text: 'Good', class: 'good' };
  if (ratio >= 0.4) return { text: 'Limited', class: 'average' };
  return { text: 'Critical', class: 'poor' };
};

const getQualityRating = (grade) => {
  if (grade.startsWith('A')) return { text: 'Premium', class: 'excellent' };
  if (grade.startsWith('B')) return { text: 'Standard', class: 'good' };
  return { text: 'Basic', class: 'average' };
};

const generateStorageInsights = (analysis) => {
  const { freshness, ripeness, shelfLife, fruitData, condition } = analysis;
  const insights = [];
  switch (condition) {
    case 'rotten':
      insights.push({
        title: '🚨 IMMEDIATE DISPOSAL REQUIRED',
        description: 'This fruit is completely spoiled. Dispose of immediately to prevent contamination of other produce. Do not compost if moldy.',
      });
      insights.push({
        title: '🧤 Safety Precautions',
        description: 'Wear gloves when handling. Wash hands thoroughly. Clean any surfaces that came in contact with the spoiled fruit.',
      });
      insights.push({
        title: '⚠️ Health Warning',
        description: 'Consuming this fruit can cause severe food poisoning, nausea, vomiting, and diarrhea. Seek medical attention if accidentally consumed.',
      });
      break;
    case 'stale':
      insights.push({
        title: '🗑️ Disposal Recommended',
        description: 'This fruit is past safe consumption. Consider composting if no mold is present, or dispose of in organic waste.',
      });
      insights.push({
        title: '⚠️ Not for Human Consumption',
        description: 'Quality has deteriorated significantly. May cause digestive issues if consumed. Not suitable for retail or food service.',
      });
      insights.push({
        title: '🔄 Prevention Tips',
        description: 'In future, monitor fruit daily for early signs of deterioration. Improve storage conditions and rotation practices.',
      });
      break;
    case 'aging':
      insights.push({
        title: '⚡ Quick Use Required',
        description: 'Consume within 1-2 days or process immediately. Suitable for cooking, baking, or juice extraction rather than fresh consumption.',
      });
      insights.push({
        title: '❄️ Immediate Refrigeration',
        description: `Refrigerate at ${fruitData.optimalTemp} immediately to slow further deterioration. Keep separate from fresh produce.`,
      });
      insights.push({
        title: '💡 Alternative Uses',
        description: 'Consider using for smoothies, jams, baked goods, or other processed applications where texture changes are acceptable.',
      });
      break;
    default:
      insights.push({
        title: '🌡️ Optimal Storage Temperature',
        description: `Store at ${fruitData.optimalTemp} with ${fruitData.optimalHumidity} humidity for maximum freshness retention.`,
      });
      insights.push({
        title: '📦 Premium Handling',
        description: 'High-quality fruit suitable for premium packaging. Handle with care to maintain appearance and extend shelf life.',
      });
      break;
  }
  return insights;
};

const generateMarketInsights = (analysis) => {
  const { freshness, shelfLife, fruitData, variety } = analysis;
  const insights = [];
  let priceCategory = 'premium';
  if (freshness < 70) priceCategory = 'discount';
  else if (freshness < 85) priceCategory = 'standard';
  const suggestedPrice = fruitData.priceRange[priceCategory];
  insights.push({
    title: '💰 Pricing Strategy',
    description: `Recommended price: ₹${suggestedPrice}/kg (${priceCategory} category). Current quality supports ${priceCategory} market positioning.`,
  });
  if (shelfLife > 7) {
    insights.push({
      title: '🚚 Distribution Potential',
      description: 'Extended shelf life makes this suitable for long-distance shipping and export markets. Consider premium distribution channels.',
    });
  } else if (shelfLife > 3) {
    insights.push({
      title: '🏪 Local Market Focus',
      description: 'Good for regional distribution and retail chains. Recommend partnerships with local supermarkets and vendors.',
    });
  } else {
    insights.push({
      title: '⚡ Quick Sale Required',
      description: 'Limited shelf life requires immediate local sales or processing. Consider farm-direct sales or juice production.',
    });
  }
  insights.push({
    title: '🎯 Variety Analysis',
    description: `${variety} variety detected. This variety is known for ${getVarietyCharacteristics(selectedFruit, variety)}.`,
  });
  return insights;
};

const generateBusinessInsights = (analysis) => {
  const { freshness, shelfLife, confidence, fruitData } = analysis;
  const insights = [];
  insights.push({
    title: '📊 Inventory Priority',
    description: `${shelfLife <= 3 ? 'HIGH PRIORITY' : shelfLife <= 7 ? 'MEDIUM PRIORITY' : 'LOW PRIORITY'} - Rotate stock accordingly. First-in-first-out strategy recommended.`,
  });
  if (confidence > 90) {
    insights.push({
      title: '✅ Quality Assurance',
      description: 'High-confidence analysis results. Current quality control processes are effective. Maintain current standards.',
    });
  } else {
    insights.push({
      title: '🔍 Enhanced Monitoring',
      description: 'Moderate confidence in analysis. Recommend additional manual inspection and enhanced quality control protocols.',
    });
  }
  const profitMargin = calculateProfitMargin(analysis);
  insights.push({
    title: '💼 Profit Optimization',
    description: `Estimated profit margin: ${profitMargin}%. ${profitMargin > 40 ? 'Excellent profitability' : profitMargin > 25 ? 'Good returns expected' : 'Consider cost optimization'}.`,
  });
  insights.push({
    title: '🌱 Sustainability Score',
    description: `${shelfLife > fruitData.avgShelfLife * 0.7 ? 'Low food waste potential' : 'Higher waste risk'}. Consider ${freshness < 70 ? 'alternative processing' : 'extended storage'} options.`,
  });
  return insights;
};

const getVarietyCharacteristics = (fruit, variety) => {
  const characteristics = {
    apple: {
      'Red Delicious': 'sweet flavor and long storage life',
      'Granny Smith': 'tart taste and excellent baking properties',
      'Gala': 'mild sweetness and crisp texture',
      'Fuji': 'exceptional sweetness and firm flesh',
      'Honeycrisp': 'crisp texture and balanced sweet-tart flavor',
      'Golden Delicious': 'mellow sweetness and soft texture',
    },
    banana: {
      'Cavendish': 'reliable ripening and sweet flavor',
      'Lady Finger': 'delicate texture and intense sweetness',
      'Red Banana': 'unique appearance and raspberry notes',
      'Plantain': 'starchy texture suitable for cooking',
    },
    orange: {
      'Navel': 'sweet and seedless, ideal for fresh eating',
      'Valencia': 'juicy and perfect for juicing',
      'Blood Orange': 'distinctive red flesh and tart-sweet flavor',
      'Mandarin': 'easy to peel and sweet',
    },
    strawberry: {
      'Albion': 'firm texture and sweet flavor',
      'Seascape': 'high yield and disease resistance',
      'Chandler': 'large size and bright red color',
      'Festival': 'firm and good for shipping',
    },
    grape: {
      'Red Globe': 'large size and sweet flavor',
      'Thompson Seedless': 'seedless and versatile',
      'Flame Seedless': 'crisp and sweet',
      'Black Beauty': 'rich flavor and deep color',
    },
    mango: {
      'Alphonso': 'rich flavor and creamy texture',
      'Tommy Atkins': 'vibrant color and firm flesh',
      'Kent': 'sweet and juicy',
      'Haden': 'aromatic and flavorful',
    },
  };
  return characteristics[fruit]?.[variety] || 'distinctive flavor and good market appeal';
};

const calculateProfitMargin = (analysis) => {
  const { freshness, shelfLife } = analysis;
  let baseMargin = 30;
  if (freshness > 85) baseMargin += 15;
  else if (freshness < 70) baseMargin -= 10;
  if (shelfLife > 7) baseMargin += 10;
  else if (shelfLife < 3) baseMargin -= 15;
  return Math.max(5, Math.min(60, baseMargin));
};

const resetAnalysis = () => {
  setSelectedFruit(null);
  setSelectedCondition(null);
  setUploadedImage(null);
  setAnalysisResults(null);
  setCurrentStep(1);
};

return (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="container"
          onClick={(e) => e.stopPropagation()}
        >
          <style>
            {`
              .upload-section {
                text-align: center;
                border: 2px dashed #d1d5db;
                border-radius: 16px;
                padding: 32px;
                transition: all 0.3s ease;
              }
              .upload-section.dragover {
                border-color: #ff6b6b;
                background: #fff3e0;
              }
              .upload-buttons {
                display: flex;
                gap: 16px;
                justify-content: center;
                margin: 24px 0;
                flex-wrap: wrap;
              }
              .upload-btn.secondary {
                background: linear-gradient(135deg, #34c0eb 0%, #1e88e5 100%);
              }
              .upload-btn.secondary:hover {
                box-shadow: 0 8px 16px rgba(33, 150, 243, 0.3);
                background: linear-gradient(135deg, #1e88e5 0%, #34c0eb 100%);
              }
              .image-preview {
                max-width: 100%;
                max-height: 360px;
                border-radius: 16px;
                margin: 24px 0;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
                transition: transform 0.3s ease;
              }
              .image-preview:hover {
                transform: scale(1.02);
              }
              .analysis-section {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 24px;
                margin-top: 24px;
              }
              .loading {
                text-align: center;
                padding: 48px;
                color: #4b5e5a;
              }
              .ai-spinner {
                width: 64px;
                height: 64px;
                margin: 0 auto 24px;
                position: relative;
              }
              .ai-spinner::before {
                content: '🤖';
                font-size: 2.5rem;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                animation: pulse 1.5s infinite ease-in-out;
              }
              .ai-spinner::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border: 3px solid #f3f3f3;
                border-top: 3px solid #ff6b6b;
                border-radius: 50%;
                animation: spin 1.2s linear infinite;
              }
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              @keyframes pulse {
                0%, 100% { transform: translate(-50%, -50%) scale(1); }
                50% { transform: translate(-50%, -50%) scale(1.15); }
              }
              .metrics-dashboard {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                gap: 20px;
                margin: 24px 0;
              }
              .metric-card {
                background: white;
                border-radius: 16px;
                padding: 24px;
                text-align: center;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
              }
              .metric-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 3px;
                background: linear-gradient(90deg, #ff6b6b, #34c0eb, #ffca28, #d81b60);
              }
              .metric-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
              }
              .metric-icon {
                font-size: 2rem;
                margin-bottom: 12px;
                display: block;
                color: #ff6b6b;
              }
              .metric-value {
                font-size: 2.25rem;
                font-weight: 700;
                margin: 12px 0;
                background: linear-gradient(135deg, #1a3c34 0%, #4b5e5a 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
              }
              .metric-label {
                font-size: 0.9rem;
                color: #6b7280;
                font-weight: 500;
                margin-bottom: 12px;
              }
              .progress-container {
                position: relative;
                margin: 16px 0;
              }
              .progress-bar {
                width: 100%;
                height: 10px;
                background: #f1f3f5;
                border-radius: 5px;
                overflow: hidden;
              }
              .progress-fill {
                height: 100%;
                border-radius: 5px;
                transition: width 1s ease-in-out;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                animation: shimmer 2.5s infinite linear;
              }
              @keyframes shimmer {
                0% { background-position: -300px 0; }
                100% { background-position: 300px 0; }
              }
              .rating {
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 0.85rem;
                font-weight: 600;
                letter-spacing: 0.5px;
                transition: all 0.3s ease;
              }
              .rating.excellent {
                background: linear-gradient(135deg, #2e7d32 0%, #4caf50 100%);
                color: white;
              }
              .rating.good {
                background: linear-gradient(135deg, #ff8e53 0%, #ff6b6b 100%);
                color: white;
              }
              .rating.average {
                background: linear-gradient(135deg, #ffca28 0%, #ffb300 100%);
                color: white;
              }
              .rating.poor {
                background: linear-gradient(135deg, #d81b60 0%, #c2185b 100%);
                color: white;
              }
              .insights-panel {
                background: white;
                border-radius: 16px;
                padding: 24px;
                margin: 24px 0;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
              }
              .insights-header {
                display: flex;
                align-items: center;
                gap: 12px;
                margin-bottom: 20px;
                padding-bottom: 12px;
                border-bottom: 2px solid #f1f3f5;
              }
              .insights-header h3 {
                color: #1a3c34;
                font-size: 1.25rem;
                font-weight: 600;
              }
              .insight-item {
                background: linear-gradient(135deg, #f8fafc 0%, #f1f3f5 100%);
                border-left: 4px solid #ff6b6b;
                padding: 16px;
                margin: 12px 0;
                border-radius: 8px;
                transition: all 0.3s ease;
              }
              .insight-item:hover {
                transform: translateX(8px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
              }
              .insight-title {
                font-weight: 600;
                color: #1a3c34;
                margin-bottom: 8px;
                font-size: 1rem;
              }
              .insight-desc {
                color: #4b5e5a;
                font-size: 0.9rem;
                line-height: 1.5;
              }
              .confidence-score {
                text-align: center;
                background: linear-gradient(135deg, #34c0eb 0%, #1e88e5 100%);
                color: white;
                padding: 24px;
                border-radius: 16px;
                margin: 24px 0;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
              }
              .confidence-value {
                font-size: 2.5rem;
                font-weight: 800;
                margin: 12px 0;
              }
              .warning-banner {
                background: linear-gradient(135deg, #ffca28 0%, #ffb300 100%);
                color: #1a3c34;
                padding: 16px;
                border-radius: 12px;
                margin: 20px 0;
                text-align: center;
                animation: pulse-warning 2s infinite;
              }
              .danger-banner {
                background: linear-gradient(135deg, #d81b60 0%, #c2185b 100%);
                color: white;
                padding: 20px;
                border-radius: 12px;
                margin: 20px 0;
                text-align: center;
                animation: pulse-danger 1.8s infinite;
                border: 2px solid #f06292;
              }
              @keyframes pulse-warning {
                0%, 100% { box-shadow: 0 0 0 0 rgba(255, 202, 40, 0.6); }
                50% { box-shadow: 0 0 0 8px rgba(255, 202, 40, 0); }
              }
              @keyframes pulse-danger {
                0%, 100% { box-shadow: 0 0 0 0 rgba(216, 27, 96, 0.7); }
                50% { box-shadow: 0 0 0 10px rgba(216, 27, 96, 0); }
              }
              @media (max-width: 768px) {
                .analysis-section {
                  grid-template-columns: 1fr;
                }
                .upload-buttons {
                  flex-direction: column;
                  align-items: center;
                  gap: 12px;
                }
                .upload-btn {
                  width: 100%;
                  max-width: 280px;
                }
                .metrics-dashboard {
                  grid-template-columns: 1fr;
                }
              }
            `}
          </style>
          {currentStep === 2 && (
            <div id="imageUploadSection" className="content-section">
              <div
                className="upload-section"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.add('dragover');
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove('dragover');
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove('dragover');
                  const file = e.dataTransfer.files[0];
                  if (file && file.type.startsWith('image/')) {
                    handleFileSelect({ target: { files: [file] } });
                  }
                }}
              >
                <h2>📸 Upload Fruit Image</h2>
                <p>
                  Capture a clear photo of your{' '}
                  <span id="selectedFruitName">{fruitDatabase[selectedFruit]?.name.toLowerCase()}</span>
                </p>
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFileSelect}
                />
                <div className="upload-buttons">
                  <motion.button
                    whileHover={{ translateY: -2 }}
                    whileTap={{ translateY: 0 }}
                    className="upload-btn"
                    onClick={() => document.getElementById('fileInput')?.click()}
                  >
                    📷 Select Image
                  </motion.button>
                  <motion.button
                    whileHover={{ translateY: -2 }}
                    whileTap={{ translateY: 0 }}
                    className="upload-btn secondary"
                    onClick={captureImage}
                  >
                    📸 Take Photo
                  </motion.button>
                </div>
                {uploadedImage && (
                  <motion.img
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    src={uploadedImage}
                    alt={`Uploaded ${selectedFruit}`}
                    className="image-preview"
                  />
                )}
                {uploadedImage && (
                  <motion.button
                    id="startAnalysis"
                    whileHover={{ translateY: -2 }}
                    whileTap={{ translateY: 0 }}
                    className="upload-btn"
                    onClick={startAnalysis}
                  >
                    🤖 Start AI Analysis
                  </motion.button>
                )}
              </div>
            </div>
          )}
          {currentStep === 3 && (
            <div id="analysisSection" className="content-section">
              <div className="loading">
                <div className="ai-spinner"></div>
                <h3>🧠 Analyzing Image...</h3>
                <p>
                  Processing <span id="analyzingFruit">{fruitDatabase[selectedFruit]?.name.toLowerCase()}</span> with
                  AI vision
                </p>
                <div id="progressText">Initializing neural networks...</div>
              </div>
            </div>
          )}
        ```jsx
const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target.result);
      setTimeout(() => {
        const startButton = document.getElementById('startAnalysis');
        if (startButton) {
          startButton.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    };
    reader.readAsDataURL(file);
  } else {
    alert('Please select a valid image file.');
  }
};

const captureImage = () => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        alert('Camera access granted! In production, this would capture and process the image.');
        stream.getTracks().forEach((track) => track.stop());
      })
      .catch(() => {
        alert('Camera not available. Please use the gallery option.');
      });
  } else {
    alert('Camera functionality not supported.');
  }
};

const startAnalysis = () => {
  if (!uploadedImage || !selectedFruit || !selectedCondition) {
    alert('Please select a fruit, condition, and upload an image.');
    return;
  }
  setCurrentStep(3);
  const stages = [
    'Preprocessing image data...',
    'Extracting visual features...',
    'Analyzing color patterns...',
    'Detecting surface defects...',
    'Measuring firmness indicators...',
    'Calculating ripeness metrics...',
    'Estimating shelf life...',
    'Generating quality score...',
    'Compiling business insights...',
  ];
  let stageIndex = 0;
  const progressText = document.getElementById('progressText');
  const stageInterval = setInterval(() => {
    if (stageIndex < stages.length) {
      if (progressText) progressText.textContent = stages[stageIndex];
      stageIndex++;
    } else {
      clearInterval(stageInterval);
      setTimeout(() => {
        const analysis = generateRealisticAnalysis(fruitDatabase[selectedFruit]);
        setAnalysisResults(analysis);
        setCurrentStep(4);
        setTimeout(() => {
          const resultsSection = document.getElementById('resultsSection');
          if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }, 1000);
    }
  }, 800);
};

const generateRealisticAnalysis = (fruitData) => {
  let freshness, ripeness, shelfLife, confidence, qualityScore, qualityGrade, variety;
  switch (selectedCondition) {
    case 'fresh':
      freshness = Math.round(85 + Math.random() * 15);
      ripeness = Math.round(Math.max(70, Math.min(95, fruitData.peakRipeness + (Math.random() - 0.5) * 15)));
      shelfLife = Math.round(fruitData.avgShelfLife * (0.9 + Math.random() * 0.1));
      confidence = Math.round(88 + Math.random() * 12);
      break;
    case 'aging':
      freshness = Math.round(60 + Math.random() * 25);
      ripeness = Math.round(Math.max(80, Math.min(100, fruitData.peakRipeness + (Math.random() * 20))));
      shelfLife = Math.round(fruitData.avgShelfLife * (0.3 + Math.random() * 0.4));
      confidence = Math.round(82 + Math.random() * 10);
      break;
    case 'stale':
      freshness = Math.round(25 + Math.random() * 35);
      ripeness = Math.round(Math.max(90, Math.min(100, 95 + Math.random() * 5)));
      shelfLife = Math.round(fruitData.avgShelfLife * (0.1 + Math.random() * 0.2));
      confidence = Math.round(75 + Math.random() * 15);
      break;
    case 'rotten':
      freshness = Math.round(5 + Math.random() * 20);
      ripeness = 100;
      shelfLife = Math.round(0 + Math.random() * 2);
      confidence = Math.round(90 + Math.random() * 10);
      break;
    default:
      freshness = Math.round(60 + Math.random() * 25);
      ripeness = Math.round(fruitData.peakRipeness);
      shelfLife = Math.round(fruitData.avgShelfLife * 0.5);
      confidence = 85;
  }
  qualityScore = (freshness * 0.5) + (Math.min(ripeness, 90) * 0.3) + (confidence * 0.2);
  if (selectedCondition === 'rotten') qualityGrade = 'F';
  else if (selectedCondition === 'stale') qualityGrade = freshness > 50 ? 'D+' : 'D';
  else if (qualityScore >= 90) qualityGrade = 'A+';
  else if (qualityScore >= 85) qualityGrade = 'A';
  else if (qualityScore >= 80) qualityGrade = 'A-';
  else if (qualityScore >= 75) qualityGrade = 'B+';
  else if (qualityScore >= 70) qualityGrade = 'B';
  else if (qualityScore >= 60) qualityGrade = 'C';
  else qualityGrade = 'D';
  variety = fruitData.varieties[Math.floor(Math.random() * fruitData.varieties.length)];
  return { freshness, ripeness, shelfLife: Math.max(0, shelfLife), confidence, qualityGrade, qualityScore, fruitData, condition: selectedCondition, variety };
};

const getRating = (value) => {
  if (value >= 85) return { text: 'Excellent', class: 'excellent' };
  if (value >= 75) return { text: 'Good', class: 'good' };
  if (value >= 65) return { text: 'Average', class: 'average' };
  return { text: 'Poor', class: 'poor' };
};

const getShelfLifeRating = (days, avgDays) => {
  const ratio = days / avgDays;
  if (ratio >= 0.8) return { text: 'Extended', class: 'excellent' };
  if (ratio >= 0.6) return { text: 'Good', class: 'good' };
  if (ratio >= 0.4) return { text: 'Limited', class: 'average' };
  return { text: 'Critical', class: 'poor' };
};

const getQualityRating = (grade) => {
  if (grade.startsWith('A')) return { text: 'Premium', class: 'excellent' };
  if (grade.startsWith('B')) return { text: 'Standard', class: 'good' };
  return { text: 'Basic', class: 'average' };
};

const generateStorageInsights = (analysis) => {
  const { freshness, ripeness, shelfLife, fruitData, condition } = analysis;
  const insights = [];
  switch (condition) {
    case 'rotten':
      insights.push({
        title: '🚨 IMMEDIATE DISPOSAL REQUIRED',
        description: 'This fruit is completely spoiled. Dispose of immediately to prevent contamination of other produce. Do not compost if moldy.',
      });
      insights.push({
        title: '🧤 Safety Precautions',
        description: 'Wear gloves when handling. Wash hands thoroughly. Clean any surfaces that came in contact with the spoiled fruit.',
      });
      insights.push({
        title: '⚠️ Health Warning',
        description: 'Consuming this fruit can cause severe food poisoning, nausea, vomiting, and diarrhea. Seek medical attention if accidentally consumed.',
      });
      break;
    case 'stale':
      insights.push({
        title: '🗑️ Disposal Recommended',
        description: 'This fruit is past safe consumption. Consider composting if no mold is present, or dispose of in organic waste.',
      });
      insights.push({
        title: '⚠️ Not for Human Consumption',
        description: 'Quality has deteriorated significantly. May cause digestive issues if consumed. Not suitable for retail or food service.',
      });
      insights.push({
        title: '🔄 Prevention Tips',
        description: 'In future, monitor fruit daily for early signs of deterioration. Improve storage conditions and rotation practices.',
      });
      break;
    case 'aging':
      insights.push({
        title: '⚡ Quick Use Required',
        description: 'Consume within 1-2 days or process immediately. Suitable for cooking, baking, or juice extraction rather than fresh consumption.',
      });
      insights.push({
        title: '❄️ Immediate Refrigeration',
        description: `Refrigerate at ${fruitData.optimalTemp} immediately to slow further deterioration. Keep separate from fresh produce.`,
      });
      insights.push({
        title: '💡 Alternative Uses',
        description: 'Consider using for smoothies, jams, baked goods, or other processed applications where texture changes are acceptable.',
      });
      break;
    default:
      insights.push({
        title: '🌡️ Optimal Storage Temperature',
        description: `Store at ${fruitData.optimalTemp} with ${fruitData.optimalHumidity} humidity for maximum freshness retention.`,
      });
      insights.push({
        title: '📦 Premium Handling',
        description: 'High-quality fruit suitable for premium packaging. Handle with care to maintain appearance and extend shelf life.',
      });
      break;
  }
  return insights;
};

const generateMarketInsights = (analysis) => {
  const { freshness, shelfLife, fruitData, variety } = analysis;
  const insights = [];
  let priceCategory = 'premium';
  if (freshness < 70) priceCategory = 'discount';
  else if (freshness < 85) priceCategory = 'standard';
  const suggestedPrice = fruitData.priceRange[priceCategory];
  insights.push({
    title: '💰 Pricing Strategy',
    description: `Recommended price: ₹${suggestedPrice}/kg (${priceCategory} category). Current quality supports ${priceCategory} market positioning.`,
  });
  if (shelfLife > 7) {
    insights.push({
      title: '🚚 Distribution Potential',
      description: 'Extended shelf life makes this suitable for long-distance shipping and export markets. Consider premium distribution channels.',
    });
  } else if (shelfLife > 3) {
    insights.push({
      title: '🏪 Local Market Focus',
      description: 'Good for regional distribution and retail chains. Recommend partnerships with local supermarkets and vendors.',
    });
  } else {
    insights.push({
      title: '⚡ Quick Sale Required',
      description: 'Limited shelf life requires immediate local sales or processing. Consider farm-direct sales or juice production.',
    });
  }
  insights.push({
    title: '🎯 Variety Analysis',
    description: `${variety} variety detected. This variety is known for ${getVarietyCharacteristics(selectedFruit, variety)}.`,
  });
  return insights;
};

const generateBusinessInsights = (analysis) => {
  const { freshness, shelfLife, confidence, fruitData } = analysis;
  const insights = [];
  insights.push({
    title: '📊 Inventory Priority',
    description: `${shelfLife <= 3 ? 'HIGH PRIORITY' : shelfLife <= 7 ? 'MEDIUM PRIORITY' : 'LOW PRIORITY'} - Rotate stock accordingly. First-in-first-out strategy recommended.`,
  });
  if (confidence > 90) {
    insights.push({
      title: '✅ Quality Assurance',
      description: 'High-confidence analysis results. Current quality control processes are effective. Maintain current standards.',
    });
  } else {
    insights.push({
      title: '🔍 Enhanced Monitoring',
      description: 'Moderate confidence in analysis. Recommend additional manual inspection and enhanced quality control protocols.',
    });
  }
  const profitMargin = calculateProfitMargin(analysis);
  insights.push({
    title: '💼 Profit Optimization',
    description: `Estimated profit margin: ${profitMargin}%. ${profitMargin > 40 ? 'Excellent profitability' : profitMargin > 25 ? 'Good returns expected' : 'Consider cost optimization'}.`,
  });
  insights.push({
    title: '🌱 Sustainability Score',
    description: `${shelfLife > fruitData.avgShelfLife * 0.7 ? 'Low food waste potential' : 'Higher waste risk'}. Consider ${freshness < 70 ? 'alternative processing' : 'extended storage'} options.`,
  });
  return insights;
};

const getVarietyCharacteristics = (fruit, variety) => {
  const characteristics = {
    apple: {
      'Red Delicious': 'sweet flavor and long storage life',
      'Granny Smith': 'tart taste and excellent baking properties',
      'Gala': 'mild sweetness and crisp texture',
      'Fuji': 'exceptional sweetness and firm flesh',
      'Honeycrisp': 'crisp texture and balanced sweet-tart flavor',
      'Golden Delicious': 'mellow sweetness and soft texture',
    },
    banana: {
      'Cavendish': 'reliable ripening and sweet flavor',
      'Lady Finger': 'delicate texture and intense sweetness',
      'Red Banana': 'unique appearance and raspberry notes',
      'Plantain': 'starchy texture suitable for cooking',
    },
    orange: {
      'Navel': 'sweet and seedless, ideal for fresh eating',
      'Valencia': 'juicy and perfect for juicing',
      'Blood Orange': 'distinctive red flesh and tart-sweet flavor',
      'Mandarin': 'easy to peel and sweet',
    },
    strawberry: {
      'Albion': 'firm texture and sweet flavor',
      'Seascape': 'high yield and disease resistance',
      'Chandler': 'large size and bright red color',
      'Festival': 'firm and good for shipping',
    },
    grape: {
      'Red Globe': 'large size and sweet flavor',
      'Thompson Seedless': 'seedless and versatile',
      'Flame Seedless': 'crisp and sweet',
      'Black Beauty': 'rich flavor and deep color',
    },
    mango: {
      'Alphonso': 'rich flavor and creamy texture',
      'Tommy Atkins': 'vibrant color and firm flesh',
      'Kent': 'sweet and juicy',
      'Haden': 'aromatic and flavorful',
    },
  };
  return characteristics[fruit]?.[variety] || 'distinctive flavor and good market appeal';
};

const calculateProfitMargin = (analysis) => {
  const { freshness, shelfLife } = analysis;
  let baseMargin = 30;
  if (freshness > 85) baseMargin += 15;
  else if (freshness < 70) baseMargin -= 10;
  if (shelfLife > 7) baseMargin += 10;
  else if (shelfLife < 3) baseMargin -= 15;
  return Math.max(5, Math.min(60, baseMargin));
};

const resetAnalysis = () => {
  setSelectedFruit(null);
  setSelectedCondition(null);
  setUploadedImage(null);
  setAnalysisResults(null);
  setCurrentStep(1);
};

return (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="container"
          onClick={(e) => e.stopPropagation()}
        >
          <style>
            {`
              .upload-section {
                text-align: center;
                border: 2px dashed #d1d5db;
                border-radius: 16px;
                padding: 32px;
                transition: all 0.3s ease;
              }
              .upload-section.dragover {
                border-color: #ff6b6b;
                background: #fff3e0;
              }
              .upload-buttons {
                display: flex;
                gap: 16px;
                justify-content: center;
                margin: 24px 0;
                flex-wrap: wrap;
              }
              .upload-btn.secondary {
                background: linear-gradient(135deg, #34c0eb 0%, #1e88e5 100%);
              }
              .upload-btn.secondary:hover {
                box-shadow: 0 8px 16px rgba(33, 150, 243, 0.3);
                background: linear-gradient(135deg, #1e88e5 0%, #34c0eb 100%);
              }
              .image-preview {
                max-width: 100%;
                max-height: 360px;
                border-radius: 16px;
                margin: 24px 0;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
                transition: transform 0.3s ease;
              }
              .image-preview:hover {
                transform: scale(1.02);
              }
              .analysis-section {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 24px;
                margin-top: 24px;
              }
              .loading {
                text-align: center;
                padding: 48px;
                color: #4b5e5a;
              }
              .ai-spinner {
                width: 64px;
                height: 64px;
                margin: 0 auto 24px;
                position: relative;
              }
              .ai-spinner::before {
                content: '🤖';
                font-size: 2.5rem;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                animation: pulse 1.5s infinite ease-in-out;
              }
              .ai-spinner::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border: 3px solid #f3f3f3;
                border-top: 3px solid #ff6b6b;
                border-radius: 50%;
                animation: spin 1.2s linear infinite;
              }
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              @keyframes pulse {
                0%, 100% { transform: translate(-50%, -50%) scale(1); }
                50% { transform: translate(-50%, -50%) scale(1.15); }
              }
              .metrics-dashboard {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                gap: 20px;
                margin: 24px 0;
              }
              .metric-card {
                background: white;
                border-radius: 16px;
                padding: 24px;
                text-align: center;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
              }
              .metric-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 3px;
                background: linear-gradient(90deg, #ff6b6b, #34c0eb, #ffca28, #d81b60);
              }
              .metric-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
              }
              .metric-icon {
                font-size: 2rem;
                margin-bottom: 12px;
                display: block;
                color: #ff6b6b;
              }
              .metric-value {
                font-size: 2.25rem;
                font-weight: 700;
                margin: 12px 0;
                background: linear-gradient(135deg, #1a3c34 0%, #4b5e5a 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
              }
              .metric-label {
                font-size: 0.9rem;
                color: #6b7280;
                font-weight: 500;
                margin-bottom: 12px;
              }
              .progress-container {
                position: relative;
                margin: 16px 0;
              }
              .progress-bar {
                width: 100%;
                height: 10px;
                background: #f1f3f5;
                border-radius: 5px;
                overflow: hidden;
              }
              .progress-fill {
                height: 100%;
                border-radius: 5px;
                transition: width 1s ease-in-out;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                animation: shimmer 2.5s infinite linear;
              }
              @keyframes shimmer {
                0% { background-position: -300px 0; }
                100% { background-position: 300px 0; }
              }
              .rating {
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 0.85rem;
                font-weight: 600;
                letter-spacing: 0.5px;
                transition: all 0.3s ease;
              }
              .rating.excellent {
                background: linear-gradient(135deg, #2e7d32 0%, #4caf50 100%);
                color: white;
              }
              .rating.good {
                background: linear-gradient(135deg, #ff8e53 0%, #ff6b6b 100%);
                color: white;
              }
              .rating.average {
                background: linear-gradient(135deg, #ffca28 0%, #ffb300 100%);
                color: white;
              }
              .rating.poor {
                background: linear-gradient(135deg, #d81b60 0%, #c2185b 100%);
                color: white;
              }
              .insights-panel {
                background: white;
                border-radius: 16px;
                padding: 24px;
                margin: 24px 0;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
              }
              .insights-header {
                display: flex;
                align-items: center;
                gap: 12px;
                margin-bottom: 20px;
                padding-bottom: 12px;
                border-bottom: 2px solid #f1f3f5;
              }
              .insights-header h3 {
                color: #1a3c34;
                font-size: 1.25rem;
                font-weight: 600;
              }
              .insight-item {
                background: linear-gradient(135deg, #f8fafc 0%, #f1f3f5 100%);
                border-left: 4px solid #ff6b6b;
                padding: 16px;
                margin: 12px 0;
                border-radius: 8px;
                transition: all 0.3s ease;
              }
              .insight-item:hover {
                transform: translateX(8px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
              }
              .insight-title {
                font-weight: 600;
                color: #1a3c34;
                margin-bottom: 8px;
                font-size: 1rem;
              }
              .insight-desc {
                color: #4b5e5a;
                font-size: 0.9rem;
                line-height: 1.5;
              }
              .confidence-score {
                text-align: center;
                background: linear-gradient(135deg, #34c0eb 0%, #1e88e5 100%);
                color: white;
                padding: 24px;
                border-radius: 16px;
                margin: 24px 0;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
              }
              .confidence-value {
                font-size: 2.5rem;
                font-weight: 800;
                margin: 12px 0;
              }
              .warning-banner {
                background: linear-gradient(135deg, #ffca28 0%, #ffb300 100%);
                color: #1a3c34;
                padding: 16px;
                border-radius: 12px;
                margin: 20px 0;
                text-align: center;
                animation: pulse-warning 2s infinite;
              }
              .danger-banner {
                background: linear-gradient(135deg, #d81b60 0%, #c2185b 100%);
                color: white;
                padding: 20px;
                border-radius: 12px;
                margin: 20px 0;
                text-align: center;
                animation: pulse-danger 1.8s infinite;
                border: 2px solid #f06292;
              }
              @keyframes pulse-warning {
                0%, 100% { box-shadow: 0 0 0 0 rgba(255, 202, 40, 0.6); }
                50% { box-shadow: 0 0 0 8px rgba(255, 202, 40, 0); }
              }
              @keyframes pulse-danger {
                0%, 100% { box-shadow: 0 0 0 0 rgba(216, 27, 96, 0.7); }
                50% { box-shadow: 0 0 0 10px rgba(216, 27, 96, 0); }
              }
              @media (max-width: 768px) {
                .analysis-section {
                  grid-template-columns: 1fr;
                }
                .upload-buttons {
                  flex-direction: column;
                  align-items: center;
                  gap: 12px;
                }
                .upload-btn {
                  width: 100%;
                  max-width: 280px;
                }
                .metrics-dashboard {
                  grid-template-columns: 1fr;
                }
              }
            `}
          </style>
          {currentStep === 2 && (
            <div id="imageUploadSection" className="content-section">
              <div
                className="upload-section"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.add('dragover');
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove('dragover');
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove('dragover');
                  const file = e.dataTransfer.files[0];
                  if (file && file.type.startsWith('image/')) {
                    handleFileSelect({ target: { files: [file] } });
                  }
                }}
              >
                <h2>📸 Upload Fruit Image</h2>
                <p>
                  Capture a clear photo of your{' '}
                  <span id="selectedFruitName">{fruitDatabase[selectedFruit]?.name.toLowerCase()}</span>
                </p>
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFileSelect}
                />
                <div className="upload-buttons">
                  <motion.button
                    whileHover={{ translateY: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="upload-btn"
                    onClick={() => document.getElementById('fileInput')?.click()}
                  >
                    📷 Select Image
                  </motion.button>
                  <motion.button
                    whileHover={{ translateY: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="upload-btn secondary"
                    onClick={captureImage}
                  >
                    📸 Take Photo
                  </motion.button>
                </div>
                {uploadedImage && (
                  <motion.img
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    src={uploadedImage}
                    alt={`Uploaded ${selectedFruit}`}
                    className="image-preview"
                  />
                )}
                {uploadedImage && (
                  <motion.button
                    id="startAnalysis"
                    whileHover={{ translateY: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="upload-btn"
                    onClick={startAnalysis}
                  >
                    🤖 Start AI Analysis
                  </motion.button>
                )}
              </div>
            </div>
          )}
          {currentStep === 3 && (
            <div id="analysisSection" className="content-section">
              <div className="loading">
                <div className="ai-spinner"></div>
                <h3>🧠 Analyzing Image...</h3>
                <p>
                  Processing <span id="analyzingFruit">{fruitDatabase[selectedFruit]?.name.toLowerCase()}</span> with
                  AI vision
                </p>
                <div id="progressText">Initializing neural networks...</div>
              </div>
            </div>
          )}
          {currentStep === 4 && analysisResults && (
            <div id="resultsSection" className="content-section">
              {analysisResults.condition === 'rotten' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="danger-banner"
                >
                  <h2>⚠️ DANGER - DO NOT CONSUME ⚠️</h2>
                  <p>
                    <strong>This fruit is completely spoiled and potentially harmful!</strong>
                  </p>
                  <p>Consuming rotten fruit can cause food poisoning, stomach issues, and serious health problems.</p>
                  <p>
                    <strong>Recommendation: DISCARD IMMEDIATELY</strong>
                  </p>
                </motion.div>
              )}
              {analysisResults.condition === 'stale' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="warning-banner"
                >
                  <h3>⚠️ WARNING - POOR QUALITY</h3>
                  <p>
                    <strong>This fruit is past its prime and not recommended for consumption.</strong>
                  </p>
                  <p>May cause digestive discomfort. Consider composting or disposal.</p>
                </motion.div>
              )}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="confidence-score"
              >
                <h3>🎯 Analysis Confidence</h3>
                <div className="confidence-value">{analysisResults.confidence}%</div>
                <p>High-precision quality assessment</p>
              </motion.div>
              <div className="metrics-dashboard">
                {[
                  {
                    id: 'freshness',
                    icon: '🌿',
                    label: 'Freshness Score',
                    value: `${analysisResults.freshness}%`,
                    barColor: 'background: linear-gradient(90deg, #4caf50, #2e7d32);',
                    rating: getRating(analysisResults.freshness),
                    delay: 0.2,
                  },
                  {
                    id: 'ripeness',
                    icon: '🎨',
                    label: 'Ripeness Level',
                    value: `${analysisResults.ripeness}%`,
                    barColor: 'background: linear-gradient(90deg, #ff8e53, #ff6b6b);',
                    rating: getRating(analysisResults.ripeness),
                    delay: 0.4,
                  },
                  {
                    id: 'shelfLife',
                    icon: '⏰',
                    label: 'Shelf Life',
                    value: `${analysisResults.shelfLife} Days`,
                    barColor: 'background: linear-gradient(90deg, #34c0eb, #1e88e5);',
                    rating: getShelfLifeRating(analysisResults.shelfLife, analysisResults.fruitData.avgShelfLife),
                    percentage: Math.min(100, (analysisResults.shelfLife / analysisResults.fruitData.avgShelfLife) * 100),
                    delay: 0.6,
                  },
                  {
                    id: 'quality',
                    icon: '💎',
                    label: 'Quality Grade',
                    value: analysisResults.qualityGrade,
                    barColor: 'background: linear-gradient(90deg, #d81b60, #c2185b);',
                    rating: getQualityRating(analysisResults.qualityGrade),
                    percentage: analysisResults.qualityScore,
                    delay: 0.8,
                  },
                ].map((metric) => (
                  <motion.div
                    key={metric.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: metric.delay }}
                    className="metric-card"
                  >
                    <span className="metric-icon">{metric.icon}</span>
                    <div className="metric-label">{metric.label}</div>
                    <div className="metric-value">{metric.value}</div>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.percentage || metric.value.replace('%', '')}%` }}
                          transition={{ duration: 1 }}
                          className="progress-fill"
                          style={metric.barColor}
                        />
                      </div>
                    </div>
                    <span className={`rating ${metric.rating.class}`}>{metric.rating.text}</span>
                  </motion.div>
                ))}
              </div>
              <div className="analysis-section">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="insights-panel"
                >
                  <div className="insights-header">
                    <span style={{ fontSize: '1.25rem' }}>🏪</span>
                    <h3>Storage & Handling</h3>
                  </div>
                  <div id="storageInsights">
                    {generateStorageInsights(analysisResults).map((insight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.0 + index * 0.1 }}
                        className="insight-item"
                      >
                        <div className="insight-title">{insight.title}</div>
                        <div className="insight-desc">{insight.description}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="insights-panel"
                >
                  <div className="insights-header">
                    <span style={{ fontSize: '1.25rem' }}>💰</span>
                    <h3>Market Analysis</h3>
                  </div>
                  <div id="marketInsights">
                    {generateMarketInsights(analysisResults).map((insight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 + index * 0.1 }}
                        className="insight-item"
                      >
                        <div className="insight-title">{insight.title}</div>
                        <div className="insight-desc">{insight.description}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="insights-panel"
              >
                <div className="insights-header">
                  <span style={{ fontSize: '1.25rem' }}>📊</span>
                  <h3>Business Intelligence</h3>
                </div>
                <div id="businessInsights">
                  {generateBusinessInsights(analysisResults).map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4 + index * 0.1 }}
                      className="insight-item"
                    >
                      <div className="insight-title">{insight.title}</div>
                      <div className="insight-desc">{insight.description}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <motion.button
                  whileHover={{ translateY: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="upload-btn"
                  style={{ background: 'linear-gradient(135deg, #6b7280, #4b5e5a)' }}
                  onClick={resetAnalysis}
                >
                  🔄 Analyze Another Fruit
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
};

const ConsumerDashboard = ({ user, onLogout, theme, setTheme, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAIAnalyzerOpen, setIsAIAnalyzerOpen] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Fresh Tomatoes',
      image: 'https://agricultureguruji.com/wp-content/uploads/2018/09/tomato-2643774_1280.jpg.webp',
      price: '$2.99/lb',
      nutrition: { calories: 22, protein: '1.1g', fiber: '1.2g', vitaminC: '13.7mg' },
      cookingMethods: ['Salad', 'Sauce', 'Soup', 'Grilled'],
      seasonalAvailability: 'Year-round',
      origin: 'Local Farm',
      harvestDate: '2025-01-15',
      expiryDate: '2025-01-25',
      storageTips: 'Store at room temperature until ripe, then refrigerate',
    },
    {
      id: 2,
      name: 'Organic Apples',
      image: 'https://extension.umn.edu/sites/extension.umn.edu/files/Two%20apples%20close-up_screen.jpg',
      price: '$3.49/lb',
      nutrition: { calories: 95, protein: '0.5g', fiber: '4.4g', vitaminC: '8.4mg' },
      cookingMethods: ['Raw', 'Baking', 'Juice', 'Salad'],
      seasonalAvailability: 'Fall',
      origin: 'Himachal Farm',
      harvestDate: '2025-01-08',
      expiryDate: '2025-02-08',
      storageTips: 'Refrigerate in crisper drawer',
    },
    {
      id: 3,
      name: 'Sweet Corn',
      image: 'https://naturespath.com/cdn/shop/articles/growing_corn-948938.jpg?v=1725927714&width=2000',
      price: '$1.99/ear',
      nutrition: { calories: 88, protein: '3.2g', fiber: '2.7g', vitaminC: '6.8mg' },
      cookingMethods: ['Boiled', 'Grilled', 'Soup', 'Salad'],
      seasonalAvailability: 'Summer',
      origin: 'Local Farm',
      harvestDate: '2025-01-12',
      expiryDate: '2025-01-19',
      storageTips: 'Keep in husk and refrigerate',
    },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const seasonalTips = [
    {
      season: 'Winter',
      tip: 'Root vegetables and winter squash are at their peak',
      products: ['Carrots', 'Potatoes', 'Squash', 'Onions'],
    },
    {
      season: 'Spring',
      tip: 'Fresh greens and early vegetables are abundant',
      products: ['Spinach', 'Lettuce', 'Asparagus', 'Peas'],
    },
    {
      season: 'Summer',
      tip: 'Berries, tomatoes, and corn are in season',
      products: ['Strawberries', 'Tomatoes', 'Corn', 'Zucchini'],
    },
    {
      season: 'Fall',
      tip: 'Apples, pumpkins, and hearty vegetables',
      products: ['Apples', 'Pumpkins', 'Sweet Potatoes', 'Brussels Sprouts'],
    },
  ];

  return (
    <div className="min-h-screen max-h-screen overflow-hidden bg-gradient-to-br from-[#F7F4EA] via-[#F0FDF4] to-[#EAF8EA] dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <AIAnalyzerModal isOpen={isAIAnalyzerOpen} onClose={() => setIsAIAnalyzerOpen(false)} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6 h-[calc(100vh-4rem)]">
        <motion.aside
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="hidden md:block w-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 shadow-sm p-4 h-full sticky top-20 overflow-auto"
        >
          <nav className="space-y-2">
            {['products', 'seasonal', 'nutrition', 'recipes'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-gray-700 dark:text-emerald-100'
                    : 'hover:bg-emerald-50 dark:hover:bg-gray-700 text-gray-700 dark:text-emerald-100/80'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAIAnalyzerOpen(!isAIAnalyzerOpen)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                isAIAnalyzerOpen
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-gray-700 dark:text-emerald-100'
                  : 'hover:bg-emerald-50 dark:hover:bg-gray-700 text-gray-700 dark:text-emerald-100/80'
              }`}
            >
              🤖 AI Fruit Analyzer
            </motion.button>
          </nav>
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-lime-50 dark:from-gray-800 dark:to-gray-700 border border-emerald-100 dark:border-gray-700">
            <p className="text-sm text-emerald-800 dark:text-emerald-200">Consumer Tip</p>
            <p className="text-xs text-emerald-700 mt-1 dark:text-emerald-300/80">
              Use the AI Fruit Analyzer to check the quality of your produce!
            </p>
          </div>
        </motion.aside>
        <div className="flex-1 h-full overflow-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-700 to-lime-600 bg-clip-text text-transparent">
              Welcome, {user?.name || 'Consumer'}!
            </h1>
            <p className="text-emerald-700/80 dark:text-emerald-200/80 mt-1">
              Discover fresh, nutritious products and cooking inspiration
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-emerald-200 dark:border-gray-700 rounded-xl text-emerald-900 dark:text-emerald-100 focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
              />
              <svg
                className="w-5 h-5 text-emerald-500 absolute left-3 top-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </motion.div>
          <AnimatePresence mode="wait">
            {activeTab === 'products' && (
              <motion.div
                key="products"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 p-6 shadow-lg"
                  >
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-xl mb-4" />
                    <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-2">{product.name}</h3>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-3">{product.price}</p>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Origin:</p>
                        <p className="text-sm text-emerald-900 dark:text-emerald-100">{product.origin}</p>
                      </div>
                      <div>
                        <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Season:</p>
                        <p className="text-sm text-emerald-900 dark:text-emerald-100">{product.seasonalAvailability}</p>
                      </div>
                      <div>
                        <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Storage:</p>
                        <p className="text-sm text-emerald-900 dark:text-emerald-100">{product.storageTips}</p>
                      </div>
                      <div>
                        <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Cooking Methods:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {product.cookingMethods.map((method, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-emerald-100 dark:bg-gray-700 text-emerald-700 dark:text-emerald-300 text-xs rounded-full"
                            >
                              {method}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
            {activeTab === 'seasonal' && (
              <motion.div
                key="seasonal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {seasonalTips.map((season, index) => (
                  <motion.div
                    key={season.season}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 p-6 shadow-lg"
                  >
                    <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-3">{season.season}</h3>
                    <p className="text-emerald-700 dark:text-emerald-300 mb-4">{season.tip}</p>
                    <div>
                      <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70 mb-2">Available Products:</p>
                      <div className="flex flex-wrap gap-2">
                        {season.products.map((product, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-emerald-100 dark:bg-gray-700 text-emerald-700 dark:text-emerald-300 text-sm rounded-full"
                          >
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
            {activeTab === 'nutrition' && (
              <motion.div
                key="nutrition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 p-6 shadow-lg"
                  >
                    <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-3">{product.name}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Calories:</p>
                        <p className="text-sm text-emerald-900 dark:text-emerald-100">{product.nutrition.calories}</p>
                      </div>
                      <div>
                        <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Protein:</p>
                        <p className="text-sm text-emerald-900 dark:text-emerald-100">{product.nutrition.protein}</p>
                      </div>
                      <div>
                        <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Fiber:</p>
                        <p className="text-sm text-emerald-900 dark:text-emerald-100">{product.nutrition.fiber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Vitamin C:</p>
                        <p className="text-sm text-emerald-900 dark:text-emerald-100">{product.nutrition.vitaminC}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
            {activeTab === 'recipes' && (
              <motion.div
                key="recipes"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 p-6 shadow-lg"
                  >
                    <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-3">
                      {product.name} Recipe Ideas
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.cookingMethods.map((method, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-emerald-100 dark:bg-gray-700 text-emerald-700 dark:text-emerald-300 text-sm rounded-full"
                        >
                          {method}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ConsumerDashboard;
```