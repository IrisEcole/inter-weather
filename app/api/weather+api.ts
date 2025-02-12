


export async function POST(request: Request) {
        try {   
               const params =  new URL (request.url).searchParams
                const lat = params.get("lat");
                const lon = params.get("lon");
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPEN_WEATHER_API_KEY}`;
                const response = await fetch(
                  url,
                );
                console.log(response);
                return response;

              } catch (error) {
                console.log(error);
                throw new Error("Location not found");
              }
      }
      