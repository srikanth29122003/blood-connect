import { useState, useEffect } from 'react';
import {
  Search, MapPin, Droplet, Phone, Mail, Heart, Filter, Users
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '../components/ui/select';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const statesWithDistricts = {
  "Andaman and Nicobar Islands": [
    "Port Blair"
  ],
  "Haryana": [
    "Faridabad",
    "Gurgaon",
    "Hisar",
    "Rohtak",
    "Panipat",
    "Karnal",
    "Sonipat",
    "Yamunanagar",
    "Panchkula",
    "Bhiwani",
    "Bahadurgarh",
    "Jind",
    "Sirsa",
    "Thanesar",
    "Kaithal",
    "Palwal",
    "Rewari",
    "Hansi",
    "Narnaul",
    "Fatehabad",
    "Gohana",
    "Tohana",
    "Narwana",
    "Mandi Dabwali",
    "Charkhi Dadri",
    "Shahbad",
    "Pehowa",
    "Samalkha",
    "Pinjore",
    "Ladwa",
    "Sohna",
    "Safidon",
    "Taraori",
    "Mahendragarh",
    "Ratia",
    "Rania",
    "Sarsod"
  ],
  "Tamil Nadu": [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Tiruchirappalli",
    "Salem",
    "Tirunelveli",
    "Tiruppur",
    "Ranipet",
    "Nagercoil",
    "Thanjavur",
    "Vellore",
    "Kancheepuram",
    "Erode",
    "Tiruvannamalai",
    "Pollachi",
    "Rajapalayam",
    "Sivakasi",
    "Pudukkottai",
    "Neyveli (TS)",
    "Nagapattinam",
    "Viluppuram",
    "Tiruchengode",
    "Vaniyambadi",
    "Theni Allinagaram",
    "Udhagamandalam",
    "Aruppukkottai",
    "Paramakudi",
    "Arakkonam",
    "Virudhachalam",
    "Srivilliputhur",
    "Tindivanam",
    "Virudhunagar",
    "Karur",
    "Valparai",
    "Sankarankovil",
    "Tenkasi",
    "Palani",
    "Pattukkottai",
    "Tirupathur",
    "Ramanathapuram",
    "Udumalaipettai",
    "Gobichettipalayam",
    "Thiruvarur",
    "Thiruvallur",
    "Panruti",
    "Namakkal",
    "Thirumangalam",
    "Vikramasingapuram",
    "Nellikuppam",
    "Rasipuram",
    "Tiruttani",
    "Nandivaram-Guduvancheri",
    "Periyakulam",
    "Pernampattu",
    "Vellakoil",
    "Sivaganga",
    "Vadalur",
    "Rameshwaram",
    "Tiruvethipuram",
    "Perambalur",
    "Usilampatti",
    "Vedaranyam",
    "Sathyamangalam",
    "Puliyankudi",
    "Nanjikottai",
    "Thuraiyur",
    "Sirkali",
    "Tiruchendur",
    "Periyasemur",
    "Sattur",
    "Vandavasi",
    "Tharamangalam",
    "Tirukkoyilur",
    "Oddanchatram",
    "Palladam",
    "Vadakkuvalliyur",
    "Tirukalukundram",
    "Uthamapalayam",
    "Surandai",
    "Sankari",
    "Shenkottai",
    "Vadipatti",
    "Sholingur",
    "Tirupathur",
    "Manachanallur",
    "Viswanatham",
    "Polur",
    "Panagudi",
    "Uthiramerur",
    "Thiruthuraipoondi",
    "Pallapatti",
    "Ponneri",
    "Lalgudi",
    "Natham",
    "Unnamalaikadai",
    "P.N.Patti",
    "Tharangambadi",
    "Tittakudi",
    "Pacode",
    "O' Valley",
    "Suriyampalayam",
    "Sholavandan",
    "Thammampatti",
    "Namagiripettai",
    "Peravurani",
    "Parangipettai",
    "Pudupattinam",
    "Pallikonda",
    "Sivagiri",
    "Punjaipugalur",
    "Padmanabhapuram",
    "Thirupuvanam"
  ],
  "Madhya Pradesh": [
    "Indore",
    "Bhopal",
    "Jabalpur",
    "Gwalior",
    "Ujjain",
    "Sagar",
    "Ratlam",
    "Satna",
    "Murwara (Katni)",
    "Morena",
    "Singrauli",
    "Rewa",
    "Vidisha",
    "Ganjbasoda",
    "Shivpuri",
    "Mandsaur",
    "Neemuch",
    "Nagda",
    "Itarsi",
    "Sarni",
    "Sehore",
    "Mhow Cantonment",
    "Seoni",
    "Balaghat",
    "Ashok Nagar",
    "Tikamgarh",
    "Shahdol",
    "Pithampur",
    "Alirajpur",
    "Mandla",
    "Sheopur",
    "Shajapur",
    "Panna",
    "Raghogarh-Vijaypur",
    "Sendhwa",
    "Sidhi",
    "Pipariya",
    "Shujalpur",
    "Sironj",
    "Pandhurna",
    "Nowgong",
    "Mandideep",
    "Sihora",
    "Raisen",
    "Lahar",
    "Maihar",
    "Sanawad",
    "Sabalgarh",
    "Umaria",
    "Porsa",
    "Narsinghgarh",
    "Malaj Khand",
    "Sarangpur",
    "Mundi",
    "Nepanagar",
    "Pasan",
    "Mahidpur",
    "Seoni-Malwa",
    "Rehli",
    "Manawar",
    "Rahatgarh",
    "Panagar",
    "Wara Seoni",
    "Tarana",
    "Sausar",
    "Rajgarh",
    "Niwari",
    "Mauganj",
    "Manasa",
    "Nainpur",
    "Prithvipur",
    "Sohagpur",
    "Nowrozabad (Khodargama)",
    "Shamgarh",
    "Maharajpur",
    "Multai",
    "Pali",
    "Pachore",
    "Rau",
    "Mhowgaon",
    "Vijaypur",
    "Narsinghgarh"
  ],
  "Jharkhand": [
    "Dhanbad",
    "Ranchi",
    "Jamshedpur",
    "Bokaro Steel City",
    "Deoghar",
    "Phusro",
    "Adityapur",
    "Hazaribag",
    "Giridih",
    "Ramgarh",
    "Jhumri Tilaiya",
    "Saunda",
    "Sahibganj",
    "Medininagar (Daltonganj)",
    "Chaibasa",
    "Chatra",
    "Gumia",
    "Dumka",
    "Madhupur",
    "Chirkunda",
    "Pakaur",
    "Simdega",
    "Musabani",
    "Mihijam",
    "Patratu",
    "Lohardaga",
    "Tenu dam-cum-Kathhara"
  ],
  "Mizoram": [
    "Aizawl",
    "Lunglei",
    "Saiha"
  ],
  "Nagaland": [
    "Dimapur",
    "Kohima",
    "Zunheboto",
    "Tuensang",
    "Wokha",
    "Mokokchung"
  ],
  "Himachal Pradesh": [
    "Shimla",
    "Mandi",
    "Solan",
    "Nahan",
    "Sundarnagar",
    "Palampur",
    "Kullu"
  ],
  "Tripura": [
    "Agartala",
    "Udaipur",
    "Dharmanagar",
    "Pratapgarh",
    "Kailasahar",
    "Belonia",
    "Khowai"
  ],
  "Andhra Pradesh": [
    "Visakhapatnam",
    "Vijayawada",
    "Guntur",
    "Nellore",
    "Kurnool",
    "Rajahmundry",
    "Kakinada",
    "Tirupati",
    "Anantapur",
    "Kadapa",
    "Vizianagaram",
    "Eluru",
    "Ongole",
    "Nandyal",
    "Machilipatnam",
    "Adoni",
    "Tenali",
    "Chittoor",
    "Hindupur",
    "Proddatur",
    "Bhimavaram",
    "Madanapalle",
    "Guntakal",
    "Dharmavaram",
    "Gudivada",
    "Srikakulam",
    "Narasaraopet",
    "Rajampet",
    "Tadpatri",
    "Tadepalligudem",
    "Chilakaluripet",
    "Yemmiganur",
    "Kadiri",
    "Chirala",
    "Anakapalle",
    "Kavali",
    "Palacole",
    "Sullurpeta",
    "Tanuku",
    "Rayachoti",
    "Srikalahasti",
    "Bapatla",
    "Naidupet",
    "Nagari",
    "Gudur",
    "Vinukonda",
    "Narasapuram",
    "Nuzvid",
    "Markapur",
    "Ponnur",
    "Kandukur",
    "Bobbili",
    "Rayadurg",
    "Samalkot",
    "Jaggaiahpet",
    "Tuni",
    "Amalapuram",
    "Bheemunipatnam",
    "Venkatagiri",
    "Sattenapalle",
    "Pithapuram",
    "Palasa Kasibugga",
    "Parvathipuram",
    "Macherla",
    "Gooty",
    "Salur",
    "Mandapeta",
    "Jammalamadugu",
    "Peddapuram",
    "Punganur",
    "Nidadavole",
    "Repalle",
    "Ramachandrapuram",
    "Kovvur",
    "Tiruvuru",
    "Uravakonda",
    "Narsipatnam",
    "Yerraguntla",
    "Pedana",
    "Puttur",
    "Renigunta",
    "Rajam",
    "Srisailam Project (Right Flank Colony) Township"
  ],
  "Punjab": [
    "Ludhiana",
    "Patiala",
    "Amritsar",
    "Jalandhar",
    "Bathinda",
    "Pathankot",
    "Hoshiarpur",
    "Batala",
    "Moga",
    "Malerkotla",
    "Khanna",
    "Mohali",
    "Barnala",
    "Firozpur",
    "Phagwara",
    "Kapurthala",
    "Zirakpur",
    "Kot Kapura",
    "Faridkot",
    "Muktsar",
    "Rajpura",
    "Sangrur",
    "Fazilka",
    "Gurdaspur",
    "Kharar",
    "Gobindgarh",
    "Mansa",
    "Malout",
    "Nabha",
    "Tarn Taran",
    "Jagraon",
    "Sunam",
    "Dhuri",
    "Firozpur Cantt.",
    "Sirhind Fatehgarh Sahib",
    "Rupnagar",
    "Jalandhar Cantt.",
    "Samana",
    "Nawanshahr",
    "Rampura Phul",
    "Nangal",
    "Nakodar",
    "Zira",
    "Patti",
    "Raikot",
    "Longowal",
    "Urmar Tanda",
    "Morinda, India",
    "Phillaur",
    "Pattran",
    "Qadian",
    "Sujanpur",
    "Mukerian",
    "Talwara"
  ],
  "Chandigarh": [
    "Chandigarh"
  ],
  "Rajasthan": [
    "Jaipur",
    "Jodhpur",
    "Bikaner",
    "Udaipur",
    "Ajmer",
    "Bhilwara",
    "Alwar",
    "Bharatpur",
    "Pali",
    "Barmer",
    "Sikar",
    "Tonk",
    "Sadulpur",
    "Sawai Madhopur",
    "Nagaur",
    "Makrana",
    "Sujangarh",
    "Sardarshahar",
    "Ladnu",
    "Ratangarh",
    "Nokha",
    "Nimbahera",
    "Suratgarh",
    "Rajsamand",
    "Lachhmangarh",
    "Rajgarh (Churu)",
    "Nasirabad",
    "Nohar",
    "Phalodi",
    "Nathdwara",
    "Pilani",
    "Merta City",
    "Sojat",
    "Neem-Ka-Thana",
    "Sirohi",
    "Pratapgarh",
    "Rawatbhata",
    "Sangaria",
    "Lalsot",
    "Pilibanga",
    "Pipar City",
    "Taranagar",
    "Vijainagar, Ajmer",
    "Sumerpur",
    "Sagwara",
    "Ramganj Mandi",
    "Lakheri",
    "Udaipurwati",
    "Losal",
    "Sri Madhopur",
    "Ramngarh",
    "Rawatsar",
    "Rajakhera",
    "Shahpura",
    "Shahpura",
    "Raisinghnagar",
    "Malpura",
    "Nadbai",
    "Sanchore",
    "Nagar",
    "Rajgarh (Alwar)",
    "Sheoganj",
    "Sadri",
    "Todaraisingh",
    "Todabhim",
    "Reengus",
    "Rajaldesar",
    "Sadulshahar",
    "Sambhar",
    "Prantij",
    "Mount Abu",
    "Mangrol",
    "Phulera",
    "Mandawa",
    "Pindwara",
    "Mandalgarh",
    "Takhatgarh"
  ],
  "Assam": [
    "Guwahati",
    "Silchar",
    "Dibrugarh",
    "Nagaon",
    "Tinsukia",
    "Jorhat",
    "Bongaigaon City",
    "Dhubri",
    "Diphu",
    "North Lakhimpur",
    "Tezpur",
    "Karimganj",
    "Sibsagar",
    "Goalpara",
    "Barpeta",
    "Lanka",
    "Lumding",
    "Mankachar",
    "Nalbari",
    "Rangia",
    "Margherita",
    "Mangaldoi",
    "Silapathar",
    "Mariani",
    "Marigaon"
  ],
  "Odisha": [
    "Bhubaneswar",
    "Cuttack",
    "Raurkela",
    "Brahmapur",
    "Sambalpur",
    "Puri",
    "Baleshwar Town",
    "Baripada Town",
    "Bhadrak",
    "Balangir",
    "Jharsuguda",
    "Bargarh",
    "Paradip",
    "Bhawanipatna",
    "Dhenkanal",
    "Barbil",
    "Kendujhar",
    "Sunabeda",
    "Rayagada",
    "Jatani",
    "Byasanagar",
    "Kendrapara",
    "Rajagangapur",
    "Parlakhemundi",
    "Talcher",
    "Sundargarh",
    "Phulabani",
    "Pattamundai",
    "Titlagarh",
    "Nabarangapur",
    "Soro",
    "Malkangiri",
    "Rairangpur",
    "Tarbha"
  ],
  "Chhattisgarh": [
    "Raipur",
    "Bhilai Nagar",
    "Korba",
    "Bilaspur",
    "Durg",
    "Rajnandgaon",
    "Jagdalpur",
    "Raigarh",
    "Ambikapur",
    "Mahasamund",
    "Dhamtari",
    "Chirmiri",
    "Bhatapara",
    "Dalli-Rajhara",
    "Naila Janjgir",
    "Tilda Newra",
    "Mungeli",
    "Manendragarh",
    "Sakti"
  ],
  "Jammu and Kashmir": [
    "Srinagar",
    "Jammu",
    "Baramula",
    "Anantnag",
    "Sopore",
    "KathUrban Agglomeration",
    "Rajauri",
    "Punch",
    "Udhampur"
  ],
  "Karnataka": [
    "Bengaluru",
    "Hubli-Dharwad",
    "Belagavi",
    "Mangaluru",
    "Davanagere",
    "Ballari",
    "Mysore",
    "Tumkur",
    "Shivamogga",
    "Raayachuru",
    "Robertson Pet",
    "Kolar",
    "Mandya",
    "Udupi",
    "Chikkamagaluru",
    "Karwar",
    "Ranebennuru",
    "Ranibennur",
    "Ramanagaram",
    "Gokak",
    "Yadgir",
    "Rabkavi Banhatti",
    "Shahabad",
    "Sirsi",
    "Sindhnur",
    "Tiptur",
    "Arsikere",
    "Nanjangud",
    "Sagara",
    "Sira",
    "Puttur",
    "Athni",
    "Mulbagal",
    "Surapura",
    "Siruguppa",
    "Mudhol",
    "Sidlaghatta",
    "Shahpur",
    "Saundatti-Yellamma",
    "Wadi",
    "Manvi",
    "Nelamangala",
    "Lakshmeshwar",
    "Ramdurg",
    "Nargund",
    "Tarikere",
    "Malavalli",
    "Savanur",
    "Lingsugur",
    "Vijayapura",
    "Sankeshwara",
    "Madikeri",
    "Talikota",
    "Sedam",
    "Shikaripur",
    "Mahalingapura",
    "Mudalagi",
    "Muddebihal",
    "Pavagada",
    "Malur",
    "Sindhagi",
    "Sanduru",
    "Afzalpur",
    "Maddur",
    "Madhugiri",
    "Tekkalakote",
    "Terdal",
    "Mudabidri",
    "Magadi",
    "Navalgund",
    "Shiggaon",
    "Shrirangapattana",
    "Sindagi",
    "Sakaleshapura",
    "Srinivaspur",
    "Ron",
    "Mundargi",
    "Sadalagi",
    "Piriyapatna",
    "Adyar"
  ],
  "Manipur": [
    "Imphal",
    "Thoubal",
    "Lilong",
    "Mayang Imphal"
  ],
  "Kerala": [
    "Thiruvananthapuram",
    "Kochi",
    "Kozhikode",
    "Kollam",
    "Thrissur",
    "Palakkad",
    "Alappuzha",
    "Malappuram",
    "Ponnani",
    "Vatakara",
    "Kanhangad",
    "Taliparamba",
    "Koyilandy",
    "Neyyattinkara",
    "Kayamkulam",
    "Nedumangad",
    "Kannur",
    "Tirur",
    "Kottayam",
    "Kasaragod",
    "Kunnamkulam",
    "Ottappalam",
    "Thiruvalla",
    "Thodupuzha",
    "Chalakudy",
    "Changanassery",
    "Punalur",
    "Nilambur",
    "Cherthala",
    "Perinthalmanna",
    "Mattannur",
    "Shoranur",
    "Varkala",
    "Paravoor",
    "Pathanamthitta",
    "Peringathur",
    "Attingal",
    "Kodungallur",
    "Pappinisseri",
    "Chittur-Thathamangalam",
    "Muvattupuzha",
    "Adoor",
    "Mavelikkara",
    "Mavoor",
    "Perumbavoor",
    "Vaikom",
    "Palai",
    "Panniyannur",
    "Guruvayoor",
    "Puthuppally",
    "Panamattom"
  ],
  "Delhi": [
    "Delhi",
    "New Delhi"
  ],
  "Dadra and Nagar Haveli": [
    "Silvassa"
  ],
  "Puducherry": [
    "Pondicherry",
    "Karaikal",
    "Yanam",
    "Mahe"
  ],
  "Uttarakhand": [
    "Dehradun",
    "Hardwar",
    "Haldwani-cum-Kathgodam",
    "Srinagar",
    "Kashipur",
    "Roorkee",
    "Rudrapur",
    "Rishikesh",
    "Ramnagar",
    "Pithoragarh",
    "Manglaur",
    "Nainital",
    "Mussoorie",
    "Tehri",
    "Pauri",
    "Nagla",
    "Sitarganj",
    "Bageshwar"
  ],
  "Uttar Pradesh": [
    "Lucknow",
    "Kanpur",
    "Firozabad",
    "Agra",
    "Meerut",
    "Varanasi",
    "Allahabad",
    "Amroha",
    "Moradabad",
    "Aligarh",
    "Saharanpur",
    "Noida",
    "Loni",
    "Jhansi",
    "Shahjahanpur",
    "Rampur",
    "Modinagar",
    "Hapur",
    "Etawah",
    "Sambhal",
    "Orai",
    "Bahraich",
    "Unnao",
    "Rae Bareli",
    "Lakhimpur",
    "Sitapur",
    "Lalitpur",
    "Pilibhit",
    "Chandausi",
    "Hardoi ",
    "Azamgarh",
    "Khair",
    "Sultanpur",
    "Tanda",
    "Nagina",
    "Shamli",
    "Najibabad",
    "Shikohabad",
    "Sikandrabad",
    "Shahabad, Hardoi",
    "Pilkhuwa",
    "Renukoot",
    "Vrindavan",
    "Ujhani",
    "Laharpur",
    "Tilhar",
    "Sahaswan",
    "Rath",
    "Sherkot",
    "Kalpi",
    "Tundla",
    "Sandila",
    "Nanpara",
    "Sardhana",
    "Nehtaur",
    "Seohara",
    "Padrauna",
    "Mathura",
    "Thakurdwara",
    "Nawabganj",
    "Siana",
    "Noorpur",
    "Sikandra Rao",
    "Puranpur",
    "Rudauli",
    "Thana Bhawan",
    "Palia Kalan",
    "Zaidpur",
    "Nautanwa",
    "Zamania",
    "Shikarpur, Bulandshahr",
    "Naugawan Sadat",
    "Fatehpur Sikri",
    "Shahabad, Rampur",
    "Robertsganj",
    "Utraula",
    "Sadabad",
    "Rasra",
    "Lar",
    "Lal Gopalganj Nindaura",
    "Sirsaganj",
    "Pihani",
    "Shamsabad, Agra",
    "Rudrapur",
    "Soron",
    "SUrban Agglomerationr",
    "Samdhan",
    "Sahjanwa",
    "Rampur Maniharan",
    "Sumerpur",
    "Shahganj",
    "Tulsipur",
    "Tirwaganj",
    "PurqUrban Agglomerationzi",
    "Shamsabad, Farrukhabad",
    "Warhapur",
    "Powayan",
    "Sandi",
    "Achhnera",
    "Naraura",
    "Nakur",
    "Sahaspur",
    "Safipur",
    "Reoti",
    "Sikanderpur",
    "Saidpur",
    "Sirsi",
    "Purwa",
    "Parasi",
    "Lalganj",
    "Phulpur",
    "Shishgarh",
    "Sahawar",
    "Samthar",
    "Pukhrayan",
    "Obra",
    "Niwai",
    "Mirzapur"
  ],
  "Bihar": [
    "Patna",
    "Gaya",
    "Bhagalpur",
    "Muzaffarpur",
    "Darbhanga",
    "Arrah",
    "Begusarai",
    "Chhapra",
    "Katihar",
    "Munger",
    "Purnia",
    "Saharsa",
    "Sasaram",
    "Hajipur",
    "Dehri-on-Sone",
    "Bettiah",
    "Motihari",
    "Bagaha",
    "Siwan",
    "Kishanganj",
    "Jamalpur",
    "Buxar",
    "Jehanabad",
    "Aurangabad",
    "Lakhisarai",
    "Nawada",
    "Jamui",
    "Sitamarhi",
    "Araria",
    "Gopalganj",
    "Madhubani",
    "Masaurhi",
    "Samastipur",
    "Mokameh",
    "Supaul",
    "Dumraon",
    "Arwal",
    "Forbesganj",
    "BhabUrban Agglomeration",
    "Narkatiaganj",
    "Naugachhia",
    "Madhepura",
    "Sheikhpura",
    "Sultanganj",
    "Raxaul Bazar",
    "Ramnagar",
    "Mahnar Bazar",
    "Warisaliganj",
    "Revelganj",
    "Rajgir",
    "Sonepur",
    "Sherghati",
    "Sugauli",
    "Makhdumpur",
    "Maner",
    "Rosera",
    "Nokha",
    "Piro",
    "Rafiganj",
    "Marhaura",
    "Mirganj",
    "Lalganj",
    "Murliganj",
    "Motipur",
    "Manihari",
    "Sheohar",
    "Maharajganj",
    "Silao",
    "Barh",
    "Asarganj"
  ],
  "Gujarat": [
    "Ahmedabad",
    "Surat",
    "Vadodara",
    "Rajkot",
    "Bhavnagar",
    "Jamnagar",
    "Nadiad",
    "Porbandar",
    "Anand",
    "Morvi",
    "Mahesana",
    "Bharuch",
    "Vapi",
    "Navsari",
    "Veraval",
    "Bhuj",
    "Godhra",
    "Palanpur",
    "Valsad",
    "Patan",
    "Deesa",
    "Amreli",
    "Anjar",
    "Dhoraji",
    "Khambhat",
    "Mahuva",
    "Keshod",
    "Wadhwan",
    "Ankleshwar",
    "Savarkundla",
    "Kadi",
    "Visnagar",
    "Upleta",
    "Una",
    "Sidhpur",
    "Unjha",
    "Mangrol",
    "Viramgam",
    "Modasa",
    "Palitana",
    "Petlad",
    "Kapadvanj",
    "Sihor",
    "Wankaner",
    "Limbdi",
    "Mandvi",
    "Thangadh",
    "Vyara",
    "Padra",
    "Lunawada",
    "Rajpipla",
    "Vapi",
    "Umreth",
    "Sanand",
    "Rajula",
    "Radhanpur",
    "Mahemdabad",
    "Ranavav",
    "Tharad",
    "Mansa",
    "Umbergaon",
    "Talaja",
    "Vadnagar",
    "Manavadar",
    "Salaya",
    "Vijapur",
    "Pardi",
    "Rapar",
    "Songadh",
    "Lathi",
    "Adalaj",
    "Chhapra",
    "Gandhinagar"
  ],
  "Telangana": [
    "Hyderabad",
    "Warangal",
    "Nizamabad",
    "Karimnagar",
    "Ramagundam",
    "Khammam",
    "Mahbubnagar",
    "Mancherial",
    "Adilabad",
    "Suryapet",
    "Jagtial",
    "Miryalaguda",
    "Nirmal",
    "Kamareddy",
    "Kothagudem",
    "Bodhan",
    "Palwancha",
    "Mandamarri",
    "Koratla",
    "Sircilla",
    "Tandur",
    "Siddipet",
    "Wanaparthy",
    "Kagaznagar",
    "Gadwal",
    "Sangareddy",
    "Bellampalle",
    "Bhongir",
    "Vikarabad",
    "Jangaon",
    "Bhadrachalam",
    "Bhainsa",
    "Farooqnagar",
    "Medak",
    "Narayanpet",
    "Sadasivpet",
    "Yellandu",
    "Manuguru",
    "Kyathampalle",
    "Nagarkurnool"
  ],
  "Meghalaya": [
    "Shillong",
    "Tura",
    "Nongstoin"
  ],
  "Himachal Praddesh": [
    "Manali"
  ],
  "Arunachal Pradesh": [
    "Naharlagun",
    "Pasighat"
  ],
  "Maharashtra": [
    "Mumbai",
    "Pune",
    "Nagpur",
    "Thane",
    "Nashik",
    "Kalyan-Dombivali",
    "Vasai-Virar",
    "Solapur",
    "Mira-Bhayandar",
    "Bhiwandi",
    "Amravati",
    "Nanded-Waghala",
    "Sangli",
    "Malegaon",
    "Akola",
    "Latur",
    "Dhule",
    "Ahmednagar",
    "Ichalkaranji",
    "Parbhani",
    "Panvel",
    "Yavatmal",
    "Achalpur",
    "Osmanabad",
    "Nandurbar",
    "Satara",
    "Wardha",
    "Udgir",
    "Aurangabad",
    "Amalner",
    "Akot",
    "Pandharpur",
    "Shrirampur",
    "Parli",
    "Washim",
    "Ambejogai",
    "Manmad",
    "Ratnagiri",
    "Uran Islampur",
    "Pusad",
    "Sangamner",
    "Shirpur-Warwade",
    "Malkapur",
    "Wani",
    "Lonavla",
    "Talegaon Dabhade",
    "Anjangaon",
    "Umred",
    "Palghar",
    "Shegaon",
    "Ozar",
    "Phaltan",
    "Yevla",
    "Shahade",
    "Vita",
    "Umarkhed",
    "Warora",
    "Pachora",
    "Tumsar",
    "Manjlegaon",
    "Sillod",
    "Arvi",
    "Nandura",
    "Vaijapur",
    "Wadgaon Road",
    "Sailu",
    "Murtijapur",
    "Tasgaon",
    "Mehkar",
    "Yawal",
    "Pulgaon",
    "Nilanga",
    "Wai",
    "Umarga",
    "Paithan",
    "Rahuri",
    "Nawapur",
    "Tuljapur",
    "Morshi",
    "Purna",
    "Satana",
    "Pathri",
    "Sinnar",
    "Uchgaon",
    "Uran",
    "Pen",
    "Karjat",
    "Manwath",
    "Partur",
    "Sangole",
    "Mangrulpir",
    "Risod",
    "Shirur",
    "Savner",
    "Sasvad",
    "Pandharkaoda",
    "Talode",
    "Shrigonda",
    "Shirdi",
    "Raver",
    "Mukhed",
    "Rajura",
    "Vadgaon Kasba",
    "Tirora",
    "Mahad",
    "Lonar",
    "Sawantwadi",
    "Pathardi",
    "Pauni",
    "Ramtek",
    "Mul",
    "Soyagaon",
    "Mangalvedhe",
    "Narkhed",
    "Shendurjana",
    "Patur",
    "Mhaswad",
    "Loha",
    "Nandgaon",
    "Warud"
  ],
  "Goa": [
    "Marmagao",
    "Panaji",
    "Margao",
    "Mapusa"
  ],
  "West Bengal": [
    "Kolkata",
    "Siliguri",
    "Asansol",
    "Raghunathganj",
    "Kharagpur",
    "Naihati",
    "English Bazar",
    "Baharampur",
    "Hugli-Chinsurah",
    "Raiganj",
    "Jalpaiguri",
    "Santipur",
    "Balurghat",
    "Medinipur",
    "Habra",
    "Ranaghat",
    "Bankura",
    "Nabadwip",
    "Darjiling",
    "Purulia",
    "Arambagh",
    "Tamluk",
    "AlipurdUrban Agglomerationr",
    "Suri",
    "Jhargram",
    "Gangarampur",
    "Rampurhat",
    "Kalimpong",
    "Sainthia",
    "Taki",
    "Murshidabad",
    "Memari",
    "Paschim Punropara",
    "Tarakeswar",
    "Sonamukhi",
    "PandUrban Agglomeration",
    "Mainaguri",
    "Malda",
    "Panchla",
    "Raghunathpur",
    "Mathabhanga",
    "Monoharpur",
    "Srirampore",
    "Adra"
  ]
};

const FindDonors = () => {
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [filters, setFilters] = useState({
    bloodGroup: '',
    state: '',
    district: '',
    searchTerm: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const API_URL = 'https://645e38f48d08100293f9f277.mockapi.io/donors';

  useEffect(() => {
    const fetchDonors = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setDonors(data);
        setFilteredDonors(data);
      } catch (error) {
        console.error("Failed to load donors:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDonors();
  }, []);

  useEffect(() => {
    let filtered = donors;

    if (filters.bloodGroup) {
      filtered = filtered.filter(donor => donor.bloodGroup === filters.bloodGroup);
    }

    if (filters.state) {
      filtered = filtered.filter(donor => donor.state === filters.state);
    }

    if (filters.district) {
      filtered = filtered.filter(donor => donor.district === filters.district);
    }

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(donor =>
        (donor.name?.toLowerCase().includes(searchLower)) ||
        (donor.email?.toLowerCase().includes(searchLower)) ||
        (donor.state?.toLowerCase().includes(searchLower)) || 
        (donor.district?.toLowerCase().includes(searchLower))
      );
    }

    setFilteredDonors(filtered);
  }, [filters, donors]);

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const clearFilters = () => {
    setFilters({
      bloodGroup: '',
      state: '',
      district: '',
      searchTerm: ''
    });
  };

  const canDonate = (lastDonation) => {
    if (!lastDonation) return true;
    const last = new Date(lastDonation);
    const now = new Date();
    const diff = (now.getTime() - last.getTime()) / (1000 * 3600 * 24);
    return diff >= 56;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Never';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-16 w-16 text-red-600 mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Finding Donors...</h2>
          <p className="text-gray-600">Please wait while we search for available donors.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <Heart className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Blood Donors
          </h1>
          <p className="text-lg text-gray-600">
            Search for blood donors in your area and connect with them directly.
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Filter className="h-5 w-5 mr-2 text-red-600" />
              Search Filters
            </CardTitle>
            <CardDescription>
              Use the filters below to find donors matching your requirements.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center">
                  <Search className="h-4 w-4 mr-2 text-red-600" />
                  Search
                </Label>
                <Input
                  placeholder="Search by name, email, or district"
                  value={filters.searchTerm}
                  onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                  className="focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center">
                  <Droplet className="h-4 w-4 mr-2 text-red-600" />
                  Blood Group
                </Label>
                <Select value={filters.bloodGroup} onValueChange={(value) => handleFilterChange('bloodGroup', value)}>
                  <SelectTrigger className="focus:ring-red-500 focus:border-red-500">
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodGroups.map(group => (
                      <SelectItem key={group} value={group}>{group}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* State */}
              <div className="space-y-2">
                <Label className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-red-600" />
                  State
                </Label>
                <Select value={filters.state} onValueChange={(value) => {
                  handleFilterChange('state', value);
                  handleFilterChange('district', ''); // reset district
                }}>
                  <SelectTrigger className="focus:ring-red-500 focus:border-red-500">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(statesWithDistricts).map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* District */}
              <div className="space-y-2">
                <Label className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-red-600" />
                  District
                </Label>
                <Select value={filters.district} onValueChange={(value) => handleFilterChange('district', value)}>
                  <SelectTrigger className="focus:ring-red-500 focus:border-red-500" disabled={!filters.state}>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    {(statesWithDistricts[filters.state] || []).map((district) => (
                      <SelectItem key={district} value={district}>{district}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button
                onClick={clearFilters}
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Donor Cards */}
        {filteredDonors.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Donors Found</h3>
              <p className="text-gray-600 mb-4">
                No donors match your current search criteria. Try adjusting your filters.
              </p>
              <Button onClick={clearFilters} className="bg-red-600 hover:bg-red-700">
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonors.map(donor => (
              <Card key={donor.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{donor.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {donor.district}, {donor.state}
                      </CardDescription>
                    </div>
                    <Badge
                      variant={canDonate(donor.lastDonation) ? "default" : "secondary"}
                      className={canDonate(donor.lastDonation) ? "bg-green-600" : "bg-orange-500"}
                    >
                      {canDonate(donor.lastDonation) ? "Available" : "Wait Period"}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Blood Group:</span>
                    <Badge variant="outline" className="text-red-600 border-red-600">
                      <Droplet className="h-3 w-3 mr-1" />
                      {donor.bloodGroup}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Last Donation:</span>
                    <span>{formatDate(donor.lastDonation)}</span>
                  </div>

                  <div className="pt-4 border-t space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-red-600" />
                      <a href={`tel:${donor.phone}`} className="hover:text-red-600 transition-colors">
                        {donor.phone}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-red-600" />
                      <a href={`mailto:${donor.email}`} className="hover:text-red-600 transition-colors">
                        {donor.email}
                      </a>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-red-600 hover:bg-red-700"
                        onClick={() => window.open(`tel:${donor.phone}`)}
                      >
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                        onClick={() => window.open(`mailto:${donor.email}`)}
                      >
                        <Mail className="h-4 w-4 mr-1" />
                        Email
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindDonors;
