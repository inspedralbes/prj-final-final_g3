<?php

namespace App\Http\Controllers;

use App\Models\event;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

class EventController extends Controller
{
    public function fetchFromTicketMaster(){
        $client = new Client();
        $currentPage = 0;
        $allEvents = [];

        // GET ALL PAGES
        do {
            $response = $client->request('GET', 'https://app.ticketmaster.com/discovery/v2/events.json?countryCode=ES&city=Barcelona&classificationName=music&page=' . $currentPage . '&apikey=' . env('TICKETMASTER_API_KEY'));
            $statusCode = $response->getStatusCode();

            if ($statusCode == 200) {
                $data = json_decode($response->getBody(), true);
                $events = $data['_embedded']['events'];

                $allEvents = array_merge($allEvents, $events);

                $currentPage++;
            } else {
                return response()->json(['error' => 'Could not retrieve data from the Ticketmaster API'], $statusCode);
            }
        } while ($currentPage < $data['page']['totalPages']);

        ///Store into database

        foreach ($allEvents as $event) {
            if (Event::where('event_id', $event['id'])->exists()) {
                continue; 
            }
            $newEvent = new Event();
            $newEvent->event_id = $event['id'];
            $newEvent->event = $event['name'];
            $newEvent->artist = isset($event['_embedded']['attractions'][0]['name']) ? $event['_embedded']['attractions'][0]['name'] : null;
            $newEvent->date = $event['dates']['start']['localDate'];
            $newEvent->time = isset($event['dates']['start']['localTime']) ? $event['dates']['start']['localTime'] : null;
            $newEvent->venue = $event['_embedded']['venues'][0]['name'];
            $newEvent->city = $event['_embedded']['venues'][0]['city']['name'];
            $newEvent->genre = $event['classifications'][0]['genre']['name'];
            $newEvent->subgenre = $event['classifications'][0]['subGenre']['name'];
            $newEvent->minprice = $event['priceRanges'][0]['min'];
            $newEvent->maxprice = $event['priceRanges'][0]['max'];
            $newEvent->promoter = $event['promoter']['name'];
            $newEvent->images = json_encode(array_column($event['images'], 'url'));
            $newEvent->save();
        }
        
    
        return response()->json(['message' => 'Events stored in the database successfully'], 200);
    }
    
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $events = Event::all();

    if ($events->isEmpty()) {
        return response()->json(['message' => 'No events found'], 404);
    }

    return response()->json(['events' => $events], 200);
}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(event $event)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, event $event)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(event $event)
    {
        //
    }
}
