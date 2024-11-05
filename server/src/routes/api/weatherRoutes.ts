import { Router, type Request, type Response } from 'express';
const router = Router();

 import HistoryService from '../../service/historyService.js';
 import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/',async (req: Request, res: Response) => {
  try {
    const { cityName  } = req.body;
    console.log(req.body);
    console.log('city in weatherroutes: ', cityName );
    const weather = await WeatherService.getWeatherForCity(cityName);
    const history = await HistoryService.addCity(cityName); 
   
  
    console.log('history:',history);
    console.log(res.status)
    //console.log(res)
    //res.status(200).json({ weather });
    res.json(weather);
  
  } catch (error) {
    console.log('error:',error);
    res.status(500).json( error);
  }
  // TODO: GET weather data from city name
  // TODO: save city to search history
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const history = await HistoryService.getCities();
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json( error);;
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const history = await HistoryService.removeCity(id);
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json( error);;
  }
});

export default router;
