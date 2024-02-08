<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\EventController;

class fetchTicketmaster extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fetchTicketmaster';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch events from Ticketmaster';

    /**
     * Execute the console command.
     */
    public function __construct()
    {
        parent::__construct();
        // Aquí puedes agregar cualquier inicialización necesaria
    }

    public function handle()
    {
        // Crear una instancia del controlador EventController
        $eventController = new EventController();
        
        // Llamar al método fetchFromTicketMaster en la instancia del controlador
        $eventController->fetchFromTicketMaster();
    }
}
