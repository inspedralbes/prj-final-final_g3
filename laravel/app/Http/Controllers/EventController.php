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
        'cities' => 'required|array|min:1',
        'cities.*.city' => 'required|string',
        'cities.*.venues' => 'nullable|array|min:1',
        'cities.*.venues.*' => 'required|string|distinct',
        'venues' => 'nullable|array',
        'venues.*' => 'nullable|string|distinct',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 400);
    }

    // Obtener los parámetros validados
    $cities = $request->input('cities');
    $requestVenues = $request->input('venues', []);

    // Extraer las ciudades y los venues de las ciudades
    $cityNames = [];
    $venues = [];

    foreach ($cities as $city) {
        $cityNames[] = $city['city'];
        if (empty($requestVenues) && isset($city['venues'])) {
            $venues = array_merge($venues, $city['venues']);
        }
    }

    // Si se especificaron venues en el request, usamos esos, si no, usamos los extraídos de las ciudades
    if (!empty($requestVenues)) {
        $venues = $requestVenues;
    }

    // Realizar la consulta
    try {
        $events = Event::whereIn('city', $cityNames)
                       ->whereIn('venue', $venues)
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
        $cities = Event::select('city')->distinct()->get();
        $locations = [];

        foreach ($cities as $city) {
            $venues = Event::where('city', $city->city)->select('venue')->distinct()->pluck('venue')->toArray();
            $locations[] = [
                'city' => $city->city,
                'venues' => $venues
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
