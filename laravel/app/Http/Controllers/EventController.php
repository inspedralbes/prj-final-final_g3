<?php

namespace App\Http\Controllers;

use App\Models\event;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller
{

    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = Event::whereNotNull('artist')
                       ->orderBy('date')
                       ->orderBy('time')
                       ->paginate(20);

        if ($events->isEmpty()) {
            return response()->json(['message' => 'No events found'], 404);
        }

        return response()->json(['events' => $events], 200);
    }
    
    public function indexAll()
    {
        $events = Event::whereNotNull('artist')
                       ->orderBy('date')
                       ->orderBy('time')
                       ->get();
    
        if ($events->isEmpty()) {
            return response()->json(['message' => 'No events found'], 404);
        }
    
        return response()->json(['events' => $events], 200);
    }

    public function getEventsByLocation(Request $request)
    {
        // Validar los datos de entrada
        $validator = Validator::make($request->all(), [
            'countries' => 'required|array',
            'cities' => 'required|array',
            'venues' => 'required|array',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        
        // Obtener los parámetros validados
        $countries = $request->input('countries');
        $cities = $request->input('cities');
        $venues = $request->input('venues');

        // Realizar la consulta
        try {
            $events = Event::whereIn('country', $countries)
                           ->whereIn('city', $cities)
                           ->whereIn('venue', $venues)
                           ->whereNotNull('artist')
                           ->orderBy('date')
                           ->orderBy('time')
                           ->get();

            if ($events->isEmpty()) {
                return response()->json(['message' => 'No events found for the specified criteria'], 404);
            }

            return response()->json(['events' => $events], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error fetching events', 'error' => $e->getMessage()], 500);
        }
    }
    
    
    public function getEventsByDistance(Request $request){
        // Validar los datos de entrada
        $validator = Validator::make($request->all(), [
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'distance' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Obtener los parámetros validados
        $latitude = $request->input('latitude');
        $longitude = $request->input('longitude');
        $distance = $request->input('distance');

        // Realizar la consulta
        try {
            $events = Event::selectRaw('*, ( 6371 * acos( cos( radians(?) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(?) ) + sin( radians(?) ) * sin( radians( latitude ) ) ) ) AS distance', [$latitude, $longitude, $latitude])
                           ->having('distance', '<', $distance)
                           ->whereNotNull('artist')
                           ->orderBy('date')
                           ->orderBy('time')
                           ->get();
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error fetching events', 'error' => $e->getMessage()], 500);
        }

        // Verificar si hay eventos
        if ($events->isEmpty()) {
            return response()->json(['message' => 'No events found for the specified criteria'], 404);
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

    public function getLocations()
    {
        $countries = Event::select('country')->distinct()->get();
        $locations = [];

        foreach ($countries as $country) {
            $cities = Event::where('country', $country->country)->select('city')->distinct()->get();
            $countryCities = [];

            foreach ($cities as $city) {
                $venues = Event::where('country', $country->country)
                               ->where('city', $city->city)
                               ->select('venue', 'latitude', 'longitude')
                               ->distinct()
                               ->get();

                // Agregar las ciudades y sus venues
                $countryCities[] = [
                    'city' => $city->city,
                    'venues' => $venues
                ];
            }

            // Agregar el país y sus ciudades al array de ubicaciones
            $locations[] = [
                'country' => $country->country,
                'cities' => $countryCities
            ];
        }

        return response()->json(['locations' => $locations], 200);
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
    public function show($id)
    {
        $event = Event::find($id);
    
        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }
    
        return response()->json(['event' => $event], 200);
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
