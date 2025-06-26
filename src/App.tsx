import React, { useState } from 'react';
import { Search, Globe, Users, DollarSign, Shield, TrendingUp, Eye, Download, Copy, ExternalLink, Zap, Star, Calendar, MapPin, AlertTriangle } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import toast from 'react-hot-toast';

interface SiteData {
  url: string;
  title: string;
  description: string;
  extractedAt: string;
  features: string[];
  earnings: {
    signupBonus: string;
    pointsValue: string;
    referralCommission: string;
    withdrawalMethods: string[];
  };
  navigation: {
    name: string;
    url: string;
  }[];
  trustSignals: {
    securityLevel: 'high' | 'medium' | 'low';
    activeUsers: string;
    payoutProof: boolean;
    socialMedia: string[];
  };
  design: {
    theme: string;
    colorScheme: string;
    responsive: boolean;
    animations: boolean;
  };
  content: {
    sections: string[];
    cta: string[];
    bonuses: string[];
  };
}

function App() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [siteData, setSiteData] = useState<SiteData | null>(null);

  // Mock analysis function - in real app this would call an API
  const analyzeSite = async () => {
    if (!url) {
      toast.error('Please enter a website URL');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock extracted data based on the crypto PTC site we inspected
    const mockData: SiteData = {
      url: url,
      title: "CryptoPTC - Earn Real Crypto",
      description: "A modern crypto PTC earning platform with glassmorphism design and attractive rewards system",
      extractedAt: new Date().toISOString(),
      features: [
        "Modern Glassmorphism UI",
        "Dark Theme Design",
        "Real-time Earnings Tracking",
        "Referral System",
        "Multiple Withdrawal Methods",
        "Mobile Responsive",
        "Animated Components",
        "User Dashboard",
        "Task Management System",
        "Rank System"
      ],
      earnings: {
        signupBonus: "1,000,000 points",
        pointsValue: "$0.00001 per point",
        referralCommission: "25%",
        withdrawalMethods: ["Bitcoin", "Ethereum", "PayPal", "Bank Transfer"]
      },
      navigation: [
        { name: "Dashboard", url: "/" },
        { name: "Tasks", url: "/tasks" },
        { name: "Wallet", url: "/wallet" },
        { name: "Referrals", url: "/referrals" },
        { name: "Profile", url: "/profile" }
      ],
      trustSignals: {
        securityLevel: 'medium',
        activeUsers: "10,000+",
        payoutProof: true,
        socialMedia: ["Telegram", "Discord", "Twitter"]
      },
      design: {
        theme: "Dark Glassmorphism",
        colorScheme: "Purple/Orange Gradient",
        responsive: true,
        animations: true
      },
      content: {
        sections: ["Welcome Section", "Stats Cards", "Quick Actions", "Recent Activity"],
        cta: ["Claim Bonus", "Start Earning", "Withdraw", "Invite Friends"],
        bonuses: ["Sign-up Bonus: 1M points", "Daily Login Bonus", "Referral Bonus: 25%"]
      }
    };

    setSiteData(mockData);
    setIsAnalyzing(false);
    toast.success('Site analysis complete!');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const exportData = () => {
    if (!siteData) return;
    
    const dataStr = JSON.stringify(siteData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `site-analysis-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Analysis exported!');
  };

  const getTrustColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Crypto PTC Site Inspector
                </h1>
                <p className="text-sm text-gray-400">Analyze and extract comprehensive site information</p>
              </div>
            </div>
            
            {siteData && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportData}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Section */}
        <Card className="mb-8 bg-black/20 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter crypto PTC website URL (e.g., https://example-ptc.com)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder-gray-400"
                />
              </div>
              <Button
                onClick={analyzeSite}
                disabled={isAnalyzing}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8"
              >
                {isAnalyzing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Search className="w-4 h-4 mr-2" />
                    Inspect Site
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {siteData && (
          <div className="space-y-8">
            {/* Site Overview */}
            <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-purple-400" />
                    Site Overview
                  </CardTitle>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                    ✓ Analyzed
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-400">Site Title</label>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-white font-medium">{siteData.title}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(siteData.title)}
                          className="text-gray-400 hover:text-white p-1"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-400">URL</label>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-white break-all">{siteData.url}</p>
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(siteData.url)}
                            className="text-gray-400 hover:text-white p-1"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(siteData.url, '_blank')}
                            className="text-gray-400 hover:text-white p-1"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-400">Description</label>
                      <p className="text-white mt-1">{siteData.description}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-400">Analysis Date</label>
                      <div className="flex items-center mt-1">
                        <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                        <p className="text-white">{new Date(siteData.extractedAt).toLocaleString()}</p>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-400">Trust Level</label>
                      <div className="flex items-center mt-1">
                        <Shield className={`w-4 h-4 mr-2 ${getTrustColor(siteData.trustSignals.securityLevel)}`} />
                        <span className={`capitalize font-medium ${getTrustColor(siteData.trustSignals.securityLevel)}`}>
                          {siteData.trustSignals.securityLevel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Analysis Tabs */}
            <Tabs defaultValue="features" className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 bg-black/20 border border-white/10">
                <TabsTrigger value="features" className="data-[state=active]:bg-purple-600">Features</TabsTrigger>
                <TabsTrigger value="earnings" className="data-[state=active]:bg-purple-600">Earnings</TabsTrigger>
                <TabsTrigger value="design" className="data-[state=active]:bg-purple-600">Design</TabsTrigger>
                <TabsTrigger value="trust" className="data-[state=active]:bg-purple-600">Trust Signals</TabsTrigger>
                <TabsTrigger value="navigation" className="data-[state=active]:bg-purple-600">Navigation</TabsTrigger>
              </TabsList>

              <TabsContent value="features" className="mt-6">
                <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                      Site Features ({siteData.features.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {siteData.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center p-3 rounded-lg bg-white/5 border border-white/10"
                        >
                          <Star className="w-4 h-4 mr-2 text-yellow-400" />
                          <span className="text-white text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="earnings" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <DollarSign className="w-5 h-5 mr-2 text-green-400" />
                        Earning Structure
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <span className="text-gray-300">Signup Bonus</span>
                        <span className="text-green-400 font-bold">{siteData.earnings.signupBonus}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <span className="text-gray-300">Points Value</span>
                        <span className="text-blue-400 font-bold">{siteData.earnings.pointsValue}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <span className="text-gray-300">Referral Commission</span>
                        <span className="text-purple-400 font-bold">{siteData.earnings.referralCommission}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-orange-400" />
                        Bonuses & Incentives
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {siteData.content.bonuses.map((bonus, index) => (
                          <div
                            key={index}
                            className="flex items-center p-3 rounded-lg bg-orange-500/10 border border-orange-500/20"
                          >
                            <div className="w-2 h-2 rounded-full bg-orange-400 mr-3"></div>
                            <span className="text-white text-sm">{bonus}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="design" className="mt-6">
                <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Eye className="w-5 h-5 mr-2 text-pink-400" />
                      Design Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <label className="text-sm font-medium text-gray-400 block mb-2">Theme Style</label>
                          <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                            <p className="text-white font-medium">{siteData.design.theme}</p>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-400 block mb-2">Color Scheme</label>
                          <div className="p-4 rounded-lg bg-gradient-to-r from-orange-500/20 to-purple-500/20 border border-orange-500/30">
                            <p className="text-white font-medium">{siteData.design.colorScheme}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <label className="text-sm font-medium text-gray-400 block mb-2">Technical Features</label>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                              <span className="text-white">Responsive Design</span>
                              <Badge className={siteData.design.responsive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                                {siteData.design.responsive ? '✓ Yes' : '✗ No'}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                              <span className="text-white">Animations</span>
                              <Badge className={siteData.design.animations ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                                {siteData.design.animations ? '✓ Yes' : '✗ No'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="trust" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Shield className="w-5 h-5 mr-2 text-blue-400" />
                        Trust Indicators
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                        <span className="text-gray-300">Security Level</span>
                        <Badge className={`${getTrustColor(siteData.trustSignals.securityLevel)} bg-current/20`}>
                          {siteData.trustSignals.securityLevel.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                        <span className="text-gray-300">Active Users</span>
                        <span className="text-white font-bold">{siteData.trustSignals.activeUsers}</span>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                        <span className="text-gray-300">Payout Proof</span>
                        <Badge className={siteData.trustSignals.payoutProof ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                          {siteData.trustSignals.payoutProof ? '✓ Available' : '✗ Not Found'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Users className="w-5 h-5 mr-2 text-purple-400" />
                        Social Presence
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {siteData.trustSignals.socialMedia.map((platform, index) => (
                          <div
                            key={index}
                            className="flex items-center p-3 rounded-lg bg-purple-500/10 border border-purple-500/20"
                          >
                            <div className="w-2 h-2 rounded-full bg-purple-400 mr-3"></div>
                            <span className="text-white">{platform}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="navigation" className="mt-6">
                <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-cyan-400" />
                      Site Navigation Structure
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {siteData.navigation.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
                        >
                          <span className="text-white font-medium">{item.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(item.url)}
                            className="text-cyan-400 hover:text-cyan-300 p-1"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Risk Assessment */}
            <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-orange-400" />
                  Risk Assessment & Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Risk Factors</h4>
                    <div className="space-y-3">
                      <div className="flex items-center p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="w-2 h-2 rounded-full bg-yellow-400 mr-3"></div>
                        <span className="text-white text-sm">High signup bonus (potential red flag)</span>
                      </div>
                      <div className="flex items-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="w-2 h-2 rounded-full bg-green-400 mr-3"></div>
                        <span className="text-white text-sm">Professional design quality</span>
                      </div>
                      <div className="flex items-center p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="w-2 h-2 rounded-full bg-blue-400 mr-3"></div>
                        <span className="text-white text-sm">Active social media presence</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Recommendations</h4>
                    <div className="space-y-3">
                      <div className="flex items-center p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="w-2 h-2 rounded-full bg-purple-400 mr-3"></div>
                        <span className="text-white text-sm">Verify payout proofs before investing time</span>
                      </div>
                      <div className="flex items-center p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <div className="w-2 h-2 rounded-full bg-orange-400 mr-3"></div>
                        <span className="text-white text-sm">Start with small tasks to test legitimacy</span>
                      </div>
                      <div className="flex items-center p-3 rounded-lg bg-pink-500/10 border border-pink-500/20">
                        <div className="w-2 h-2 rounded-full bg-pink-400 mr-3"></div>
                        <span className="text-white text-sm">Check community reviews and feedback</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Empty State */}
        {!siteData && !isAnalyzing && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Site Analyzed Yet</h3>
              <p className="text-gray-400 mb-6">
                Enter a crypto PTC website URL above to get comprehensive analysis including features, earnings structure, design elements, and trust signals.
              </p>
              <div className="text-sm text-gray-500">
                Example: https://crypto-ptc-earning-platform-n9d8vdaa.live.blink.new
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;