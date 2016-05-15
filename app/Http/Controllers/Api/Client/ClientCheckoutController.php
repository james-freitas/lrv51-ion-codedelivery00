<?php

namespace CodeDelivery\Http\Controllers\Api\Client;

use CodeDelivery\Http\Controllers\Controller;
use CodeDelivery\Http\Requests\AdminClientRequest;
use CodeDelivery\Http\Requests\CheckoutRequest;
use CodeDelivery\Repositories\OrderRepository;
use CodeDelivery\Repositories\UserRepository;
use CodeDelivery\Services\OrderService;
use Illuminate\Http\Request;
use LucaDegasperi\OAuth2Server\Facades\Authorizer;


class ClientCheckoutController extends Controller
{
    /**
     * @var OrderRepository
     */
    private $repository;
    
    /**
     * @var UserRepository
     */
    private $userRepository;

    private $service;

    public function __construct(
        OrderRepository $repository,
        UserRepository $userRepository,
        OrderService $service
    )
    {
        $this->repository = $repository;
        $this->userRepository = $userRepository;
        $this->service = $service;
    }

    public function index()
    {
        $id = Authorizer::getResourceOwnerId();
        $clientId = $this->userRepository->find($id)->client->id;
        $orders = $this->repository->with('items')->scopeQuery(function($query) use($clientId) {
            return $query->where('client_id', '=', $clientId);
        })->paginate();

        return $orders;
    }


    public function store(CheckoutRequest $request)
    {
        $data = $request->all();
        $id = Authorizer::getResourceOwnerId();
        $clientId = $this->userRepository->find($id)->client->id;
        $data['client_id'] = $clientId;

        $o = $this->service->create($data);

        $o = $this->repository->with('items')->find($o->id);
        return $o;
    }

    public function show($id)
    {
        $o = $this->repository->with(['client','items','cupom'])->find($id);
        $o->items->each(function($item){
            $item->product;
        });
        return $o;
    }

}