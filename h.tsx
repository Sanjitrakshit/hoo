import { useLanguage } from "@/contexts/LanguageContext";
import { Disease } from "@/data/healthData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Coffee, Stethoscope } from "lucide-react";

type ResultsDisplayProps = {
  predictedDisease: Disease | null;
  onBack: () => void;
  onReset: () => void;
};

const ResultsDisplay = ({ 
  predictedDisease, 
  onBack, 
  onReset 
}: ResultsDisplayProps) => {
  const { language, t } = useLanguage();
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'bg-fredmed-lightGreen text-green-700';
      case 'moderate': return 'bg-amber-100 text-amber-700';
      case 'severe': return 'bg-fredmed-lightRed text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="py-6 animate-fade-in">
      <h2 className="text-2xl font-semibold mb-8 text-center text-fredmed-dark">
        {t('resultsTitle')}
      </h2>
      
      <div className="max-w-4xl mx-auto">
        {predictedDisease ? (
          <div className="space-y-6">
            {/* Disease Prediction */}
            <Card className="card-shadow transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Potential Condition</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-3">
                  {language === 'english' ? predictedDisease.english : predictedDisease.hindi}
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm">{t('howSevere')}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(predictedDisease.severity)}`}>
                    {t(predictedDisease.severity as any)}
                  </span>
                </div>
                
                {predictedDisease.consultDoctor && (
                  <div className="flex items-center gap-2 p-3 bg-fredmed-lightRed rounded-md mb-4 animate-pulse">
                    <AlertTriangle className="h-5 w-5 text-fredmed-red" />
                    <span className="text-red-700">{t('consultDoctor')}</span>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Home Remedies */}
            <Card className="card-shadow transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Coffee className="h-5 w-5 text-fredmed-green" />
                  {t('remediesTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {(language === 'english' 
                    ? predictedDisease.remedies.english 
                    : predictedDisease.remedies.hindi
                  ).map((remedy, index) => (
                    <li key={index} className="animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                      {remedy}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            {/* Medical Advice */}
            {predictedDisease.consultDoctor && (
              <Card className="card-shadow border-fredmed-red transition-all duration-300 hover:shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Stethoscope className="h-5 w-5 text-fredmed-red" />
                    {t('consultDoctorTitle')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    {language === 'english' 
                      ? "Based on your symptoms, we recommend consulting with a healthcare professional for proper diagnosis and treatment."
                      : "आपके लक्षणों के आधार पर, हम उचित निदान और उपचार के लिए एक स्वास्थ्य देखभाल पेशेवर से परामर्श करने की सलाह देते हैं।"}
                  </p>
                  <Button className="w-full bg-fredmed-red hover:bg-red-600 animate-scale-in">
                    {language === 'english' 
                      ? "Find Doctors Near Me"
                      : "मेरे पास डॉक्टर खोजें"}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <Card className="card-shadow">
            <CardContent className="p-6 text-center">
              <p className="text-gray-700 mb-4">
                {language === 'english' 
                  ? "Not enough symptoms to make a prediction. Please go back and select more symptoms."
                  : "भविष्यवाणी करने के लिए पर्याप्त लक्षण नहीं हैं। कृपया वापस जाएं और अधिक लक्षण चुनें।"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
      
      <div className="mt-8 flex justify-center gap-4">
        <Button 
          onClick={onBack}
          variant="outline"
          className="border-fredmed-blue text-fredmed-blue hover:bg-fredmed-lightBlue"
        >
          {t('backBtn')}
        </Button>
        <Button 
          onClick={onReset} 
          className="bg-fredmed-blue hover:bg-blue-600"
        >
          {language === 'english' ? "Start New Diagnosis" : "नया निदान शुरू करें"}
        </Button>
      </div>
    </div>
  );
};

export default ResultsDisplay;