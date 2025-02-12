


export async function POST(request: Request) {
        try {   
                const city = new URL (request.url).searchParams.get("name");
                const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.OPEN_WEATHER_API_KEY}`;
                const response = await fetch(
                  url,
                );
                return response;
              } catch (error) {
                console.log(error);
                throw new Error("Location not found");
              }
      }
      