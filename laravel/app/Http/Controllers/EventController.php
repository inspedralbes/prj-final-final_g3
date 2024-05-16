<?php

namespace App\Http\Controllers;

use App\Models\event;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

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
                       ->get();
    
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
